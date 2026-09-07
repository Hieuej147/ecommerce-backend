import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'node:crypto';
import type { AgentRequest } from './agent-request';

@Injectable()
export class InternalAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AgentRequest>();
    const expected = this.config.getOrThrow<string>('AGENT_INTERNAL_TOKEN');
    const received = request.header('x-internal-service-token') ?? '';
    if (!this.matches(expected, received)) {
      throw new UnauthorizedException('Invalid internal service token');
    }

    const userId = request.header('x-user-id');
    if (!userId) throw new UnauthorizedException('Missing actor identity');
    request.actor = {
      userId,
      role: request.header('x-user-role') === 'admin' ? 'admin' : 'customer',
      requestId: request.header('x-request-id') ?? 'unknown',
      authorization: request.header('authorization'),
    };
    return true;
  }

  private matches(expected: string, received: string): boolean {
    const left = Buffer.from(expected);
    const right = Buffer.from(received);
    return left.length === right.length && timingSafeEqual(left, right);
  }
}
