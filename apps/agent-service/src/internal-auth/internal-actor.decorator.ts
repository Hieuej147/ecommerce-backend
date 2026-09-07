import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AgentActor } from './agent-actor';
import type { AgentRequest } from './agent-request';

export const InternalActor = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AgentActor => {
    const request = context.switchToHttp().getRequest<AgentRequest>();
    if (!request.actor) throw new Error('Internal actor is not initialized');
    return request.actor;
  },
);
