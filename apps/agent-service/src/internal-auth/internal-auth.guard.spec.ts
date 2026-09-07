import { UnauthorizedException, type ExecutionContext } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { InternalAuthGuard } from './internal-auth.guard';

const token = 'test-internal-token-12345';

function context(headers: Record<string, string | undefined>) {
  const request = {
    header: jest.fn((name: string) => headers[name]),
  };
  const executionContext = {
    switchToHttp: () => ({ getRequest: () => request }),
  } as unknown as ExecutionContext;
  return { executionContext, request };
}

describe('InternalAuthGuard', () => {
  const config = {
    getOrThrow: jest.fn().mockReturnValue(token),
  } as unknown as ConfigService;
  const guard = new InternalAuthGuard(config);

  it('rejects a request without the shared service token', () => {
    const { executionContext } = context({});
    expect(() => guard.canActivate(executionContext)).toThrow(
      UnauthorizedException,
    );
  });

  it('accepts the trusted identity forwarded by Gateway', () => {
    const { executionContext, request } = context({
      'x-internal-service-token': token,
      'x-user-id': 'user_123',
      'x-user-role': 'admin',
      'x-request-id': 'request_123',
      authorization: 'Bearer clerk-token',
    });

    expect(guard.canActivate(executionContext)).toBe(true);
    expect(request).toMatchObject({
      actor: {
        userId: 'user_123',
        role: 'admin',
        requestId: 'request_123',
        authorization: 'Bearer clerk-token',
      },
    });
  });
});
