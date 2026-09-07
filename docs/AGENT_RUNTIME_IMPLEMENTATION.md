# Self-managed CopilotKit Runtime

Gateway dùng `createCopilotRuntimeHandler` từ `@copilotkit/runtime/v2`.
Nest bridge chuyển Fetch `Response` sang Express và giữ nguyên response
streaming/SSE của AG-UI.

## Runtime URL

API Gateway expose runtime URL:

```text
http://localhost:${PORT}/v1/api/copilotkit
```

Với port mặc định:

```text
http://localhost:3000/v1/api/copilotkit
```

Runtime dùng **multi-route mode**, tương thích `useSingleEndpoint={false}`:

```text
GET  /v1/api/copilotkit/info
POST /v1/api/copilotkit/agent/dashboard/run
POST /v1/api/copilotkit/agent/dashboard/connect
POST /v1/api/copilotkit/agent/dashboard/stop/:threadId
GET  /v1/api/copilotkit/health
```

Agent id duy nhất là `dashboard`. Không dùng alias `default`.
`basePath` của runtime là `/v1/api/copilotkit`.

## Environment

```env
COPILOT_RUNTIME_ENABLED=true
AGENT_ID=dashboard
AGENT_URL=http://127.0.0.1:8001/dashboard-agent
REDIS_URL=redis://localhost:6379
```

`AGENT_URL` là upstream AG-UI agent, không phải URL frontend. Gateway forward
Clerk authorization và actor metadata server-side tới upstream.

Nếu upstream chưa chạy:

- `/health` trả `upstreamReachable: false`;
- `/info` vẫn trả runtime metadata;
- `/run` và `/connect` trả `503 AGENT_UNAVAILABLE`.

Như vậy lỗi thiếu agent được phân biệt với lỗi route 404.

`run` và `connect` là HTTP streaming/SSE. Gateway không buffer toàn bộ nội
dung; adapter chuyển tiếp từng chunk AG-UI từ upstream tới client.

## Auth flow

```text
Frontend
  -> Clerk session
  -> Gateway /v1/api/copilotkit/*
  -> Clerk global guard
  -> AgentRequestContext
  -> CopilotKit Express adapter
  -> CopilotRuntime
  -> HttpAgent
  -> AGENT_URL
```

Gateway không tin `userId`, `role`, `x-user-id` hoặc `x-user-role` do client
gửi. Các giá trị này được lấy từ Clerk claims và gắn lại trước khi forward.

## Threads và events

Concrete Threads routes được đăng ký trước runtime wildcard, nên các route sau
không bị CopilotKit bắt nhầm:

```text
/v1/api/copilotkit/threads
/v1/api/copilotkit/threads/:id
/v1/api/copilotkit/threads/:id/events
```

`PersistentAgentRunner` tiếp tục dùng `PrismaEventStore`, event coalescing,
soft-delete và Redis coordinator. A2UI `ACTIVITY_SNAPSHOT` được lưu trong
`AgentEvent.event`; runtime middleware A2UI đang tắt cho tới khi có catalog
chính thức, nhưng persistence/replay đã sẵn sàng.

## Curl smoke test

```bash
export BASE_URL=http://localhost:3000
export CLERK_TOKEN='paste-real-clerk-token'

curl -i \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  "$BASE_URL/v1/api/copilotkit/health"

curl -i \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  "$BASE_URL/v1/api/copilotkit/info"
```

Khi upstream agent đang chạy:

```bash
curl -N -X POST \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  "$BASE_URL/v1/api/copilotkit/agent/dashboard/run" \
  -d '{
    "threadId": "thread_test",
    "runId": "run_test",
    "messages": [{
      "id": "message_test",
      "role": "user",
      "content": "Tóm tắt KPI hiện tại"
    }]
  }'
```

## Test commands

```bash
pnpm build
pnpm exec nest build thread-manager
pnpm exec jest --runInBand
```

Frontend chưa được chỉnh trong phase này. Khi tích hợp, dùng runtime URL trên
và giữ `agentId="dashboard"`.
