import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  CLERK_PUBLISHABLE_KEY: z.string().min(1, 'CLERK_PUBLISHABLE_KEY is required'),
  CLERK_SECRET_KEY: z.string().min(1, 'CLERK_SECRET_KEY is required'),
  CLERK_JWT_KEY: z.string().min(1, 'CLERK_JWT_KEY is required'),
  CLERK_AUTHORIZED_PARTIES: z.string().default('http://localhost:3001'),
  CLERK_WEBHOOK_SIGNING_SECRET: z.string().min(1).optional(),
  USERS_GRPC_URL: z.string().min(1).default('localhost:5004'),
  AGENT_SERVICE_URL: z.string().url().default('http://127.0.0.1:3010'),
  AGENT_INTERNAL_TOKEN: z.string().min(16).default('development-agent-token'),
  INNGEST_EVENT_KEY: z.string().optional(),
  INNGEST_SIGNING_KEY: z.string().optional(),
  INNGEST_SERVE_ORIGIN: z.string().url().optional(),
  MAIL_HOST: z.string().optional(),
  MAIL_PORT: z.coerce.number().int().positive().optional(),
  MAIL_SECURE: z.enum(['true', 'false']).optional(),
  MAIL_USER: z.string().email().optional(),
  MAIL_PASSWORD: z.string().optional(),
  MAIL_FROM: z.string().optional(),
  ADMIN_ALERT_EMAIL: z.string().email().optional(),
});

export function validateEnv(config: Record<string, unknown>) {
  return envSchema.parse(config);
}

export type AppConfig = z.infer<typeof envSchema>;
