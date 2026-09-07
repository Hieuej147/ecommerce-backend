import { All, Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { InternalActor } from '../internal-auth/internal-actor.decorator';
import type { AgentActor } from '../internal-auth/agent-actor';
import { AgentRequestContextService } from '../context/agent-request-context.service';
import { AgentRuntimeService } from './agent-runtime.service';

@Controller('api/copilotkit')
export class AgentRuntimeController {
  constructor(
    private readonly runtime: AgentRuntimeService,
    private readonly context: AgentRequestContextService,
  ) {}

  @Get('health')
  async health(@Res() response: Response) {
    response.status(200).json(await this.runtime.health());
  }

  @All('*path')
  async handle(
    @Req() request: Request,
    @Res() response: Response,
    @InternalActor() actor: AgentActor,
  ) {
    return this.forward(request, response, actor);
  }

  @All()
  async handleRoot(
    @Req() request: Request,
    @Res() response: Response,
    @InternalActor() actor: AgentActor,
  ) {
    return this.forward(request, response, actor);
  }

  private async forward(
    request: Request,
    response: Response,
    actor: AgentActor,
  ) {
    return this.context.run(
      {
        userId: actor.userId,
        role: actor.role,
        authorization: actor.authorization,
      },
      () => this.runtime.handle(request, response),
    );
  }
}
