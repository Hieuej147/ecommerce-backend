import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  USERS_GRPC_URL: z.string().min(1).default('0.0.0.0:5004'),
  DATABASE_URL: z.string().url(),
});

export function validateUsersEnv(config: Record<string, unknown>) {
  return schema.parse(config);
}
