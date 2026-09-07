# Order & Payment implementation report

## Implemented

- Added Order gRPC application on `ORDER_GRPC_URL` (default `5002`).
- Added Payment gRPC application on `PAYMENT_GRPC_URL` (default `5003`).
- Added Gateway REST modules for `/v1/orders` and `/v1/payments`.
- Added Order/Payment Prisma schemas and generated clients with Prisma 7 PostgreSQL adapter.
- Added Stripe Checkout Session, ownership checks and signed/idempotent webhook handling.
- Added order idempotency, stock reserve/release calls, pending/paid/cancelled state handling.
- Added root migration `add_order_payment` to the shared `ecommerce` database.

## Prisma note

`prisma.order.config.ts` and `prisma.payment.config.ts` generate service-specific clients. Because all domains currently use one PostgreSQL database, Prisma migration history remains centralized in the root Catalog schema/config. Running independent `migrate dev` commands for multiple configs against the same database causes `_prisma_migrations` drift and must not be done.

## Verification completed

```text
pnpm build                 PASS
pnpm test --runInBand      PASS (9 suites, 20 tests)
prisma validate            PASS (Catalog, Order, Payment schemas)
Catalog migration         PASS
Order/Payment migration   included in root add_order_payment migration
```

## Run locally

```bash
docker compose -f docker-compose.catalog.yml up -d
pnpm db:catalog:generate
pnpm db:order:generate
pnpm db:payment:generate
pnpm db:catalog:migrate
pnpm exec nest start catalog --watch
pnpm exec nest start order --watch
pnpm exec nest start payment --watch
pnpm run start:dev
```

Payment requires real Stripe test values before checkout/webhook testing:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Not included yet

- Email/Inngest worker.
- Refunds and shipping.
- Admin order listing endpoint.
- Production Stripe keys.
- Refunds and shipping are not included yet. Order/payment events now publish to
  Inngest; Gmail email delivery still requires `MAIL_*` configuration and a real
  credential test.
- Production should move Stripe secrets to AWS Secrets Manager/Parameter Store and use separate restricted keys per environment.
