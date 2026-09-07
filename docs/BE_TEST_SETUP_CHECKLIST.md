# Checklist chuẩn bị để test Backend

Tài liệu này mô tả **những thứ phải bật trước khi mở Postman** và thứ tự kiểm
tra cho local development. Không commit `.env` và không gửi các secret vào
Postman/frontend.

## 1. Phân biệt bắt buộc và tuỳ chọn

| Thành phần | Cần bật khi test | Dùng để làm gì |
|---|---:|---|
| PostgreSQL Docker | Có | Catalog, Users, Agent và các migration |
| API Gateway | Có | REST boundary ở `http://localhost:3000` |
| Users gRPC | Có | Đồng bộ user Clerk và admin user APIs |
| Catalog/Order/Payment gRPC | Có khi test nghiệp vụ | Product, order, checkout |
| Agent Service | Có khi test threads/runtime | CopilotKit runtime, thread persistence |
| Python AG-UI upstream | Chỉ khi test chat thật | `/run` và LLM `gpt-4o-mini` |
| Clerk | Có khi gọi route protected | JWT thật và claim `role` |
| Stripe CLI | Chỉ khi test webhook | Forward webhook sandbox vào Gateway |
| Inngest Dev Server | Chỉ khi test background job | Nhận event order/payment local |
| Redis | Chưa bắt buộc MVP | Chưa nằm trên đường chạy local hiện tại |

`/v1/health`, danh sách product public và unit tests có thể chạy mà không cần
Clerk, Stripe, Inngest hoặc Python agent.

## 2. Seed dữ liệu dashboard

Repo hiện có seed idempotent gồm 48 products, 72 orders và payment rows. Chạy
sau migrations:

```bash
pnpm db:seed:demo
```

Chạy lại không tạo duplicate vì seed dùng `externalId`. Chi tiết và giới hạn
demo data xem `DEMO_DATA_GUIDE.md`.

## 3. Chuẩn bị `.env` (chỉ kiểm tra tên biến)

Tạo `.env` ở root từ `.env.example`. Các biến tối thiểu:

```env
PORT=3000
DATABASE_URL=postgresql://ecommerce:ecommerce@localhost:5438/ecommerce

CATALOG_GRPC_URL=127.0.0.1:5001
ORDER_GRPC_URL=127.0.0.1:5002
PAYMENT_GRPC_URL=127.0.0.1:5003
USERS_GRPC_URL=127.0.0.1:5004

CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_JWT_KEY="-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----"
CLERK_AUTHORIZED_PARTIES=http://localhost:3003,http://localhost:3000
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...

AGENT_SERVICE_URL=http://127.0.0.1:3010
AGENT_SERVICE_PORT=3010
AGENT_INTERNAL_TOKEN=<same-long-random-value-for-gateway-and-agent>
AGENT_URL=http://127.0.0.1:8001/dashboard-agent
OPENAI_API_KEY=sk-...

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CURRENCY=usd
INNGEST_DEV=1
INNGEST_EVENT_KEY=
INNGEST_SIGNING_KEY=
INNGEST_SERVE_ORIGIN=http://localhost:3000/v1/inngest

MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_SECURE=true
MAIL_USER=<gmail-address>
MAIL_PASSWORD=<gmail-app-password>
MAIL_FROM=<sender-address>
ADMIN_ALERT_EMAIL=<admin-address>
```

`AGENT_URL` là URL **Python AG-UI server**, không phải URL frontend. Nếu chưa
có Python server thì runtime discovery vẫn có thể hoạt động, nhưng gửi chat
thật sẽ trả `503 AGENT_UNAVAILABLE`.

## 4. Cấu hình Clerk trước khi test

Trong Clerk Dashboard (Development instance):

1. Bật Email verification bằng code; Google OAuth nếu muốn.
2. Tạo JWT template/session claim:

   ```json
   { "role": "{{user.public_metadata.role}}" }
   ```

3. Với tài khoản admin test, đặt Public metadata:

   ```json
   { "role": "admin" }
   ```

4. Đăng xuất/đăng nhập lại hoặc refresh session sau khi đổi metadata. Token cũ
   không tự thay đổi claim.
5. Tạo Clerk webhook cho `user.created`, `user.updated`, `user.deleted` tại:
   `https://<public-dev-tunnel>/v1/webhooks/clerk`; điền signing secret vào
   `CLERK_WEBHOOK_SIGNING_SECRET`.

Token dùng Postman phải là **session token của chính user**, lấy từ frontend
đã đăng nhập (không dùng publishable key, secret key hoặc JWT key làm Bearer
token).

## 5. Khởi động local theo thứ tự

### Terminal 1 — PostgreSQL

```bash
docker compose -f docker-compose.catalog.yml up -d
docker compose -f docker-compose.catalog.yml ps
```

Chờ container `microservice-catalog-postgres` ở trạng thái `healthy`, sau đó
chạy migration một lần:

```bash
pnpm db:migrate:deploy
pnpm db:users:deploy
pnpm db:agent:deploy
```

### Terminal 2–7 — gRPC services và Gateway

```bash
pnpm start:dev:users
pnpm start:dev:catalog
pnpm start:dev:order
pnpm start:dev:payment
pnpm start:dev:agent
pnpm start:dev:gateway
```

Nếu thấy `EADDRINUSE`, service cũ đang chiếm port. Dừng terminal cũ bằng
`Ctrl+C`, rồi chạy lại; không cần xoá database.

Gateway phải log `Nest application successfully started` trên port `3000`.

### Terminal 8 — Inngest Dev Server (tuỳ chọn)

```bash
npx inngest-cli@latest dev -u http://localhost:3000/v1/inngest/
```

Mở UI Inngest mà CLI in ra. Chỉ bật terminal này khi test event nền; gRPC
synchronous request không phụ thuộc Inngest. Các function hiện có gồm welcome
user, order email, payment status email và low-stock alert.

### Terminal 9 — Stripe listener (tuỳ chọn)

Cài Stripe CLI một lần, đăng nhập sandbox, rồi chạy:

```bash
stripe login
stripe listen --forward-to http://localhost:3000/v1/payments/webhook/stripe
```

CLI sẽ in một `whsec_...` riêng cho listener. Dùng giá trị đó làm
`STRIPE_WEBHOOK_SECRET` của process Payment/Gateway local rồi **restart các
process**. Secret webhook trong Stripe Dashboard và secret do `stripe listen`
in ra có thể khác nhau.

## 6. Kiểm tra nhanh trước Postman

```bash
curl -i http://localhost:3000/v1/health
curl -i http://localhost:3000/v1/api/copilotkit/health
curl -i http://localhost:3000/v1/api/copilotkit/info
curl -i http://localhost:3000/v1/inngest/
```

Kết quả mong đợi:

- Gateway health: `200` và `status=ok`.
- Runtime health: `200`; `upstreamReachable=true` chỉ khi Python AG-UI đang
  chạy.
- Runtime info: agent id là `dashboard` (không dùng `default`).
- Inngest local: JSON có `mode=dev` và function count.

Kiểm tra port nếu cần:

```bash
ss -ltnp | rg ':3000|:3010|:5001|:5002|:5003|:5004|:5438|:8001'
```

## 7. Chuẩn bị Postman

Tạo environment:

```text
baseUrl       = http://localhost:3000
clerkToken    = <session token của user thường>
adminToken    = <session token của user có role admin>
productId     =
orderId       =
paymentId     =
threadId      =
```

Collection-level Authorization: `Bearer {{clerkToken}}`. Với endpoint admin,
chọn request-level Authorization `Bearer {{adminToken}}`.

Không tự gửi `x-user-id`, `x-user-role` hay `x-internal-service-token` từ
Postman. Đây là metadata do Gateway/Agent Service gắn ở phía server.

## 8. Thứ tự test đề nghị

1. `GET {{baseUrl}}/v1/health` — không token, phải `200`.
2. `GET {{baseUrl}}/v1/products` — kiểm tra Catalog public.
3. `GET {{baseUrl}}/v1/me` với `clerkToken` — kiểm tra Clerk → Users sync.
4. `GET {{baseUrl}}/v1/admin/users` với `adminToken` — kiểm tra claim admin.
5. CRUD product bằng admin token.
6. `POST /v1/orders` với `Idempotency-Key`, gửi lại lần hai để kiểm tra idempotency.
7. `POST /v1/payments/checkout`, thanh toán bằng thẻ Stripe test
   `4242 4242 4242 4242`, rồi kiểm tra webhook/payment status.
8. `GET /v1/api/copilotkit/health` và `/info`.
9. Tạo/list/rename/archive/unarchive thread.
10. Chỉ khi Python AG-UI upstream chạy: gửi run với agent `dashboard` và kiểm
    tra SSE `RUN_STARTED`, message events, `RUN_FINISHED` cùng A2UI activity
    nếu flow đó đã đăng ký.

## 9. Khi test thất bại

| Lỗi | Kiểm tra đầu tiên |
|---|---|
| `401 A valid Clerk session is required` | Bearer là Clerk session token còn hạn; refresh đăng nhập |
| `403 Admin role required` | Public metadata đúng `role=admin`, claim template đúng, lấy token mới |
| `ECONNREFUSED :500x` | gRPC service tương ứng chưa chạy hoặc URL sai |
| `EADDRINUSE` | dừng process cũ đang giữ port |
| `503 AGENT_UNAVAILABLE` | Python AG-UI server chưa chạy hoặc `AGENT_URL` sai |
| Runtime info `404` | dùng `/v1/api/copilotkit/info`, agent id `dashboard`; không dùng `default` |
| Stripe signature invalid | dùng đúng secret do listener hiện tại in ra, restart service |
| Inngest 500/signing key | local phải có `INNGEST_DEV=1` và Dev Server đang forward đúng URL |
| Prisma datasource/migration lỗi | DB healthy, URL đúng schema và dùng đúng `prisma.*.config.ts` |

## 10. Những phần chưa thể xác nhận chỉ bằng việc bật service

- Clerk webhook thật cần public HTTPS tunnel và một event phát sinh từ Clerk.
- Stripe webhook thật cần Stripe CLI và một Checkout sandbox hoàn tất.
- Chat LLM thật cần Python AG-UI production implementation; Agent Service
  hiện chỉ là runtime/proxy/persistence boundary.
- A2A production call và A2UI runtime registration chưa được bật trong MVP.
- `pnpm lint` chưa xanh; build và Jest là gate hiện tại.

## 11. Dọn môi trường sau khi test

- Dừng các terminal service bằng `Ctrl+C`.
- Có thể giữ PostgreSQL container để lần sau test nhanh hơn; không xoá volume.
- Không commit `.env`, token Postman export hoặc output chứa secret.
