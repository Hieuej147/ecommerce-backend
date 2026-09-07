import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'apps/users/prisma/schema.prisma',
  migrations: { path: 'apps/users/prisma/migrations' },
  datasource: { url: `${env('DATABASE_URL')}?schema=users` },
});
