import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'apps/agent-service/prisma/schema.prisma',
  migrations: { path: 'apps/agent-service/prisma/migrations' },
  datasource: { url: `${process.env.DATABASE_URL || 'postgresql://placeholder:placeholder@localhost:5432/ecommerce'}?schema=agent_runtime` },
});
