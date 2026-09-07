import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
export default defineConfig({
  schema: 'apps/order/prisma/schema.prisma',
  migrations: { path: 'apps/order/prisma/migrations' },
  datasource: { url: env('DATABASE_URL') },
});
