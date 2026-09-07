# Backend documentation index

Đây là bộ tài liệu hiện hành của `Microservice-E-Commerce`. Khi nội dung giữa
các file lịch sử khác nhau, ưu tiên theo thứ tự:

1. `BE_COMPLETION_REPORT.md` — trạng thái implementation mới nhất.
2. `BE_TEST_SETUP_CHECKLIST.md` — chuẩn bị service và test Postman.
3. `INNGEST_EVENT_BUS_GUIDE.md` — event/background flow.
4. `SYSTEM_DESIGN.md` — architecture baseline và trade-off.

## Đã triển khai

- API Gateway REST tại port `3000`, Clerk JWT verification và admin claim.
- Users, Catalog, Order, Payment gRPC services.
- Một PostgreSQL database `ecommerce` với schema logic theo service.
- Stripe Checkout và raw-body webhook idempotency.
- Agent Service self-managed CopilotKit runtime, AG-UI proxy và soft-delete
  threads/events.
- Inngest producer/consumer flow cho user, order, payment và low-stock.
- Gmail SMTP adapter cho Inngest email functions.
- Prisma v7 configs và generated clients riêng cho từng service.

## Chưa hoàn thành

- Python LangGraph production agent trong `agent-python/main.py`.
- A2A analytics sub-agent production flow.
- A2UI runtime catalog registration; `/info` hiện vẫn báo disabled.
- Clerk Svix, Stripe CLI, Gmail và Inngest Dev integration test với credentials
  thật.
- Redis multi-instance coordination, tracing, metrics, Docker/AWS CI/CD.
- Lint cleanup toàn repository.

## Tài liệu theo nhu cầu

| Nhu cầu | Tài liệu |
|---|---|
| Chạy backend và Postman | `BE_TEST_SETUP_CHECKLIST.md` |
| Seed data dashboard | `DEMO_DATA_GUIDE.md` |
| Tạo order/payment | `ORDER_SERVICE_IMPLEMENTATION_GUIDE.md` |
| Stripe sandbox | `STRIPE_SANDBOX_TEST_GUIDE.md` |
| Inngest async events | `INNGEST_EVENT_BUS_GUIDE.md` |
| Clerk ở frontend | `FE_CLERK_INTEGRATION_GUIDE.md`, `DEMO_DATA_GUIDE.md` |
| Catalog | `CATALOG_IMPLEMENTATION.md` |
| Threads/runtime | `THREAD_MANAGER_IMPLEMENTATION.md`, `AGENT_UI_DIAGNOSIS.md` |
| Python uv/AG-UI | `PYTHON_UV_SETUP.md` |
| A2UI use cases | `A2UI_USE_CASES.md` |
| TanStack Query + Redux Toolkit | `TANSTACK_QUERY_REDUX_GUIDE.md` |
