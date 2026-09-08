import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
export default defineConfig({
  schema: 'apps/payment/prisma/schema.prisma',
  migrations: { path: 'apps/payment/prisma/migrations' },
  datasource: { url: process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/ecommerce' },
});
