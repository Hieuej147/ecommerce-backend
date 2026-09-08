import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
export default defineConfig({
  schema: 'apps/order/prisma/schema.prisma',
  migrations: { path: 'apps/order/prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/ecommerce' },
});
