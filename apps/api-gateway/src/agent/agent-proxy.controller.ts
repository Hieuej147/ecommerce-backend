import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { getAuth } from '@clerk/express';
import { randomUUID } from 'node:crypto';
import { ConfigService } from '@nestjs/config';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { roleFromSessionClaims } from '../auth/role-from-claims';
import { toActorContext } from '../auth/types/actor-context';
import type { ActorContext } from '../auth/types/actor-context';
import { AgentProxyService } from './agent-proxy.service';

@Controller('api/copilotkit')
export class AgentProxyController {
  constructor(
    private readonly proxy: AgentProxyService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @All('info')
  handleInfo(@Req() request: Request, @Res() response: Response) {
    const actor = this.resolveActorOrFallback(request);
    return this.proxy.forward(request, response, actor);
  }

  @Public()
  @All('health')
  handleHealth(@Req() request: Request, @Res() response: Response) {
    const actor = this.resolveActorOrFallback(request);
    return this.proxy.forward(request, response, actor);
  }

  @Public()
  @All('*path')
  handle(@Req() request: Request, @Res() response: Response) {
    const actor = this.resolveActorOrFallback(request);
    return this.proxy.forward(request, response, actor);
  }

  @Public()
  @All()
  handleRoot(@Req() request: Request, @Res() response: Response) {
    const actor = this.resolveActorOrFallback(request);
    return this.proxy.forward(request, response, actor);
  }

  private resolveActorOrFallback(request: Request): ActorContext {
    try {
      const auth = getAuth(request);
      if (auth?.userId) {
        const claims = auth.sessionClaims as Record<string, unknown> | undefined;
        return toActorContext({
          ...auth,
          role: roleFromSessionClaims(claims),
          requestId: request.header('x-request-id') || randomUUID(),
        });
      }
    } catch {
      // Ignore when unauthenticated
    }

    const internalToken = request.header('x-internal-service-token');
    const configuredInternalToken = this.config.get<string>('AGENT_INTERNAL_TOKEN');
    const forwardedUserId = request.header('x-user-id');
    if (
      internalToken &&
      configuredInternalToken &&
      internalToken === configuredInternalToken &&
      forwardedUserId
    ) {
      return {
        userId: forwardedUserId,
        sessionId: null,
        orgId: null,
        orgRole: null,
        orgSlug: null,
        role: (request.header('x-user-role') as any) || 'admin',
        requestId: request.header('x-request-id') || randomUUID(),
      };
    }

    return {
      userId: 'anonymous',
      sessionId: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      role: 'customer',
      requestId: request.header('x-request-id') || randomUUID(),
    };
  }
}
