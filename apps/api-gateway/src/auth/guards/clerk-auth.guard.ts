import { getAuth } from '@clerk/express';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth.constants';
import { randomUUID } from 'node:crypto';
import { roleFromSessionClaims } from '../role-from-claims';
import { toActorContext } from '../types/actor-context';
import type { AuthenticatedRequest } from '../types/authenticated-request';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();

    // Support internal agent service authentication
    const internalToken = this.config?.get<string>('AGENT_INTERNAL_TOKEN');
    const providedToken = request.header('x-internal-service-token');
    if (internalToken && providedToken === internalToken) {
      request.actor = {
        userId: request.header('x-user-id') || 'internal-agent',
        sessionId: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        role: (request.header('x-user-role') as any) || 'admin',
        requestId: request.header('x-request-id') || randomUUID(),
      };
      return true;
    }

    const auth = getAuth(request);

    if (!auth.userId) {
      throw new UnauthorizedException('A valid Clerk session is required');
    }

    const claims = auth.sessionClaims as Record<string, unknown> | undefined;
    request.actor = toActorContext({
      ...auth,
      role: roleFromSessionClaims(claims),
      requestId: request.header('x-request-id') || randomUUID(),
    });

    return true;
  }
}
