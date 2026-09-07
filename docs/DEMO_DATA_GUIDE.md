# Demo data và tích hợp frontend

## Dataset hiện tại

Project mẫu `/mnt/disk3/E-commern-github/microservices-ecommerce` không có
dataset seed hoàn chỉnh; nó chỉ có Product/Order schema và các REST handlers để
tạo dữ liệu. Repository này dùng `scripts/seed-demo.cjs` để tạo dữ liệu phù hợp
với Admin Dashboard:

```text
48 products
72 orders
72 payment rows tương ứng
```

Seed dùng các khóa `externalId`:

```text
ui-product-01 ... ui-product-48
ui-order-001  ... ui-order-072
```

Chạy lại là idempotent: bản ghi có cùng `externalId` được upsert, không tạo
duplicate.

## Chạy seed

PostgreSQL phải healthy và Catalog/Order/Payment migrations đã deploy:

```bash
docker compose -f docker-compose.catalog.yml up -d
pnpm db:migrate:deploy
pnpm db:users:deploy
pnpm db:agent:deploy
pnpm db:seed:demo
```

Output thành công:

```json
{"products":48,"orders":72,"userId":"demo-user-001"}
```

`demo-user-001` là actor ID giả phục vụ dashboard/metrics, không phải Clerk
user thật. Khi test protected endpoint, frontend vẫn phải gửi Clerk session
token thật.

## Frontend cần Clerk ở đâu?

Đọc file:

[FE_CLERK_INTEGRATION_GUIDE.md](./FE_CLERK_INTEGRATION_GUIDE.md)

File này hướng dẫn đầy đủ:

- `ClerkProvider` và `.env.local`.
- Sign-in/sign-up email OTP và Google OAuth.
- Next middleware bảo vệ route.
- `useAuth().getToken()` để gọi REST Gateway.
- Đọc `publicMetadata.role` để hiển thị admin UI.
- Gọi Gateway với `Authorization: Bearer <Clerk session token>`.
- Cấu hình CopilotKit runtime với agent `dashboard`.

Frontend chỉ cần:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Không đưa các biến sau vào FE:

```text
CLERK_SECRET_KEY
CLERK_JWT_KEY
CLERK_WEBHOOK_SIGNING_SECRET
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
OPENAI_API_KEY
AGENT_INTERNAL_TOKEN
```
