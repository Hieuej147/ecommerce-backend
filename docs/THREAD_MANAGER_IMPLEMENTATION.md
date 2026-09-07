# Thread Manager và event persistence

## Trạng thái hiện tại

Thread Manager vẫn là source of truth cho conversation. CopilotKit Runtime
multi-route đã được bật lại ở `/v1/api/copilotkit`, nhưng upstream agent được
cấu hình độc lập qua `AGENT_URL`. Khi upstream chưa chạy, Threads vẫn hoạt động
và run/connect trả `503 AGENT_UNAVAILABLE`.

Core nằm ở `libs/thread-manager` và adapter Prisma/Clerk nằm ở
`apps/api-gateway/src/agent`.

## API Threads

```text
POST   /v1/api/copilotkit/threads
GET    /v1/api/copilotkit/threads
GET    /v1/api/copilotkit/threads/:threadId
GET    /v1/api/copilotkit/threads/:threadId/events
PATCH  /v1/api/copilotkit/threads/:threadId
DELETE /v1/api/copilotkit/threads/:threadId
POST   /v1/api/copilotkit/threads/:threadId/unarchive
```

Tất cả route đều cần Clerk access token. `userId` lấy từ token/actor context,
không lấy từ body hoặc query.

### Soft delete

`DELETE` không xóa database. Nó set `ConversationThread.archivedAt`, đổi
status về `IDLE` và trả `204 No Content`. `AgentRun` và `AgentEvent` vẫn còn
để audit/replay.

`GET /threads` chỉ trả thread đang hoạt động. `GET
/threads?includeArchived=true` chỉ trả thread đã archive, dành cho
recovery/admin; không dùng trong UI chính. `POST /:id/unarchive` khôi phục
thread. Chưa có hard-delete user endpoint.

## AgentEventStore là gì?

`PrismaEventStore` (tên cũ `AgentEventStore` vẫn được export để tương thích)
không phải AI agent. Đây là repository lưu lifecycle của run và AG-UI events:

```text
ConversationThread  1 ── N  AgentRun  1 ── N  AgentEvent
```

Các thao tác chính là `startRun`, `append`, `appendBatch`,
`replaceRunEvents`, `finishRun`, `history` và `active`.

Không có bảng A2UI riêng. A2UI được lưu như một AG-UI
`ACTIVITY_SNAPSHOT` trong cột `AgentEvent.event`. Live stream có thể đi qua
memory/Redis, còn Postgres là source of truth để replay sau restart.

Sau terminal event, serializer compact raw text/tool/state deltas, giữ
activity/A2UI events và chèn `MESSAGES_SNAPSHOT`. Việc compact chỉ áp dụng cho
dữ liệu lưu, không thay đổi live stream gửi tới client.

## Thread runner

`PersistentAgentRunner` giữ lifecycle của nguyên mẫu:

1. Tạo/kiểm tra thread và ownership.
2. Acquire một lock cho mỗi thread.
3. Tạo `AgentRun`.
4. Phát live AG-UI events.
5. Coalesce event trước khi ghi Postgres.
6. Compact history sau terminal event.
7. Finish run, chuyển thread về `IDLE`, release lock.
8. Renew lock mỗi 60 giây trong khi run dài.

Runner hiện được mount vào CopilotKit Runtime multi-route. Khi upstream agent
thay đổi, chỉ cần đổi `AGENT_URL`; không phải viết lại thread/persistence.

## Coordinator: memory và Redis

`InMemoryRunCoordinator` chỉ dành cho unit test hoặc local single-process. Nó
không chia sẻ lock giữa hai Gateway instances và mất state khi restart.

`RedisRunCoordinator` dùng Redis `SET NX PX`, Lua compare-and-delete/renew và
pub/sub. Production cần:

```env
REDIS_URL=redis://localhost:6379
```

Postgres vẫn lưu dữ liệu bền vững; Redis chỉ điều phối lock/live events. Khi
`REDIS_URL` không có, development/test dùng memory. Production sẽ fail-fast khi
thread runner được bật mà thiếu Redis.

## Test

```bash
pnpm build
pnpm exec jest --runInBand
```

Các test quan trọng:

- ownership không cho đọc thread user khác;
- create/list/rename/archive/unarchive;
- archived thread không xuất hiện trong list mặc định;
- coalesce text/tool/state deltas;
- serializer giữ `ACTIVITY_SNAPSHOT` và tạo `MESSAGES_SNAPSHOT`;
- coordinator chỉ cho một run trên mỗi thread;
- lock renewal chỉ thành công với đúng owner.

## Khi tích hợp lại AI

Chỉ bật lại runtime sau khi có agent backend mới. Khi đó cần giữ invariant:

```text
CopilotKit threadId
  === LangGraph configurable.thread_id
  === ConversationThread.id
  === AgentEvent.threadId
```

Runtime controller phải được mount riêng sau route Threads và frontend phải
trỏ tới agent id đã đăng ký. Không đưa A2UI vào bảng riêng hoặc vào
`AIMessage.additional_kwargs`.
