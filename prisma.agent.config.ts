import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'apps/agent-service/prisma/schema.prisma',
  migrations: { path: 'apps/agent-service/prisma/migrations' },
  datasource: { url: `${env('DATABASE_URL')}?schema=agent_runtime` },
});
