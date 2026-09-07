import { validateEnv } from './env';

describe('validateEnv', () => {
  it('applies safe defaults for optional settings', () => {
    expect(
      validateEnv({
        CLERK_PUBLISHABLE_KEY: 'pk_test_key',
        CLERK_SECRET_KEY: 'sk_test_key',
        CLERK_JWT_KEY: 'test-key',
      }),
    ).toEqual({
      NODE_ENV: 'development',
      CLERK_PUBLISHABLE_KEY: 'pk_test_key',
      CLERK_SECRET_KEY: 'sk_test_key',
      CLERK_JWT_KEY: 'test-key',
      CLERK_AUTHORIZED_PARTIES: 'http://localhost:3001',
      PORT: 3000,
      USERS_GRPC_URL: 'localhost:5004',
      AGENT_SERVICE_URL: 'http://127.0.0.1:3010',
      AGENT_INTERNAL_TOKEN: 'development-agent-token',
    });
  });

  it('rejects a missing Clerk JWT key', () => {
    expect(() =>
      validateEnv({
        CLERK_PUBLISHABLE_KEY: 'pk_test_key',
        CLERK_SECRET_KEY: 'sk_test_key',
      }),
    ).toThrow();
  });
});
