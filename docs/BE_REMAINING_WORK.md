# Backend remaining work

## Đã hoàn thành và verified

```text
pnpm build                  pass cho các Nest apps
pnpm exec jest --runInBand  pass các unit suites hiện có
Users + Agent migrations    applied trên PostgreSQL local
Gateway health              HTTP 200
Gateway protected route     HTTP 401 nếu thiếu Clerk token
Agent health/thread routes  pass với internal token
Inngest event registration 4 functions
```

Inngest hiện đã có producer/consumer flow cho user, order, payment và
low-stock. Email dùng Gmail SMTP khi đủ `MAIL_*`; nếu thiếu biến ở local,
function trả `skipped` để vẫn test được event flow.

## Chưa hoàn thành

1. `agent-python/main.py` vẫn là scaffold; live smoke test trước đây dùng file
   tạm LangGraph + `gpt-4o-mini`, không phải production graph.
2. Chưa chạy browser E2E với Python upstream thật trên `E-commern-test-ui`.
3. Runtime `/info` vẫn báo `a2uiEnabled:false`; chưa đăng ký A2UI catalog/schema
   production.
4. Chưa nối A2A chính thức giữa agent chính và analytics sub-agent.
5. Chưa chạy integration test với Clerk Svix webhook, Stripe CLI, Gmail SMTP và
   Inngest Dev bằng credentials thật.
6. Chưa có transactional outbox/dead-letter reconciliation cho event publish;
   đây là bước cần khi yêu cầu delivery guarantee cao hơn.
7. Redis multi-instance coordinator, tracing, metrics, rate-limit, Docker/AWS
   CI/CD và production observability chưa hoàn thiện.
8. `pnpm lint` còn lỗi format/type-safety cũ; build và Jest là gate hiện tại.

## Bypass/public agent

Không có bypass nào được commit. Gateway vẫn yêu cầu Clerk JWT; Agent Service
vẫn yêu cầu `AGENT_INTERNAL_TOKEN` và `x-user-id`. Các file smoke-test tạm thời
đã được xoá.
