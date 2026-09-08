import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  // The Catalog schema is the single migration owner for the shared dev
  // database. Other services keep separate Prisma clients for isolation but
  // do not run independent migrations against the same database.
  schema: 'apps/catalog/prisma/schema.prisma',
  migrations: { path: 'apps/catalog/prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/ecommerce' },
});
