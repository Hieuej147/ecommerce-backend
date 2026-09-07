# Catalog Service implementation guide

## Scope

Catalog is the first business microservice. The API Gateway exposes REST to the frontend, while Catalog exposes gRPC internally. Clerk authentication is performed only at the Gateway. Catalog owns its Prisma schema and database tables.

## Runtime layout

```text
Next.js + Clerk -> REST /v1/products -> API Gateway :3000
                                      |
                                      | gRPC catalog.v1 / CatalogService
                                      v
                                  Catalog :5001 -> PostgreSQL :5438
```

`catalog.v1` is the protobuf package. `CatalogService` is the service name. They are different values:

```ts
package: CATALOG_V1_PACKAGE_NAME;
client.getService('CatalogService');
```

## Start locally

```bash
docker compose -f docker-compose.catalog.yml up -d
pnpm prisma generate --schema apps/catalog/prisma/schema.prisma
pnpm prisma migrate dev --schema apps/catalog/prisma/schema.prisma --name init_catalog
pnpm exec nest start catalog --watch
pnpm run start:dev
```

Required environment:

```env
DATABASE_URL=postgresql://ecommerce:ecommerce@localhost:5438/ecommerce
CATALOG_GRPC_URL=0.0.0.0:5001
```

This project uses one PostgreSQL database (`ecommerce`) for the MVP and Prisma 7 with `@prisma/adapter-pg`. The only `prisma.config.ts` is at the repository root. Catalog owns its own tables and migration files inside that shared database; other services must not query Catalog tables directly.

## Product rules

- Slugs are unique.
- Price is an integer minor-unit amount; use `Money.amount_minor` and `currency`.
- Products are soft-deleted by changing `ACTIVE` to `ARCHIVED`.
- Public listing defaults to active products.
- Page size is clamped to 1..100.

## Stock rules

`ReserveStock` is idempotent by `reservation_id`. The service checks every line and decrements all products in one transaction. If any line lacks stock, the transaction rolls back.

`ReleaseStock` restores all reservation lines in one transaction. Releasing an already released reservation is safe and does not increment stock a second time.

## REST API

```text
GET    /v1/products
GET    /v1/products/:id
POST   /v1/products          (admin)
PATCH  /v1/products/:id      (admin)
DELETE /v1/products/:id      (admin, soft archive)
```

Public reads do not require a session. Mutations require a valid Clerk session whose claims contain `metadata.role=admin` or `publicMetadata.role=admin`.

## gRPC API

The contract is in `proto/catalog.proto`. The Catalog controller implements `GetProduct`, `ListProducts`, `CreateProduct`, `UpdateProduct`, `ArchiveProduct`, `ReserveStock`, and `ReleaseStock`.

## Tests

```bash
pnpm test -- --runInBand apps/catalog/src/catalog.service.spec.ts
pnpm test -- --runInBand
pnpm build
```

Unit tests use a mocked Prisma client. Integration tests require the PostgreSQL container and a migrated database.

## Troubleshooting

- `InvalidGrpcPackageException`: use `catalog.v1` for `package`, not `CatalogService`.
- `Path outside of project folder`: do not configure Nest assets with `../../../proto`; runtime reads `proto/catalog.proto` from the repository root.
- `EADDRINUSE`: another process owns port 3000 or 5001.
- `.env` not loaded: Catalog explicitly loads root `.env` with `dotenv`.
- No proto under `dist`: expected locally; Docker images must copy root `proto`.
