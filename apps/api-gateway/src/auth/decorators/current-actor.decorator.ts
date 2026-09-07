import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { ActorContext } from '../types/actor-context';
import type { AuthenticatedRequest } from '../types/authenticated-request';

export const CurrentActor = createParamDecorator(
  (_data: unknown, context: ExecutionContext): ActorContext => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.actor) {
      throw new Error('CurrentActor is only available on authenticated routes');
    }
    return request.actor;
  },
);
