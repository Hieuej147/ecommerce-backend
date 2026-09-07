import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  AGENT_SERVICE_PORT: z.coerce.number().int().positive().default(3010),
  AGENT_INTERNAL_TOKEN: z.string().min(16),
  DATABASE_URL: z.string().url(),
  COPILOT_RUNTIME_ENABLED: z
    .enum(['true', 'false'])
    .default('true')
    .transform((value) => value === 'true'),
  AGENT_ID: z.string().min(1).default('dashboard'),
  AGENT_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
});

export function validateAgentEnv(config: Record<string, unknown>) {
  return schema.parse(config);
}
