import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { InternalActor } from '../internal-auth/internal-actor.decorator';
import type { AgentActor } from '../internal-auth/agent-actor';
import { AgentThreadStore } from './agent-thread.store';
import { PrismaEventStore } from '../events/agent-event.store';
import { AgentRequestContextService } from '../context/agent-request-context.service';

@Controller('api/copilotkit/threads')
export class AgentThreadsController {
  constructor(
    private readonly threads: AgentThreadStore,
    private readonly events: PrismaEventStore,
    private readonly context: AgentRequestContextService,
  ) {}

  @Post()
  create(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Body() body: { agentId?: string; threadId?: string; title?: string },
  ) {
    return this.scoped(actor, request, async () => {
      const thread = await this.threads.create(
        body.agentId ?? 'dashboard',
        body.threadId,
      );
      const result = body.title
        ? await this.threads.rename(thread.id, body.title)
        : thread;
      return this.toClientThread(result);
    });
  }

  @Get()
  list(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Query('agentId') agentId?: string,
    @Query('cursor') cursor?: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('includeArchived') includeArchived?: string,
  ) {
    return this.scoped(actor, request, async () => {
      const result = await this.threads.list({
        agentId,
        cursor,
        limit,
        includeArchived: includeArchived === 'true',
      });
      return {
        ...result,
        threads: result.threads.map((thread) => this.toClientThread(thread)),
      };
    });
  }

  @Get(':threadId')
  get(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Param('threadId') threadId: string,
  ) {
    return this.scoped(actor, request, async () => {
      const thread = await this.threads.get(threadId);
      if (!thread) throw new NotFoundException('Thread not found');
      return this.toClientThread(thread);
    });
  }

  @Get(':threadId/events')
  getEvents(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Param('threadId') threadId: string,
  ) {
    return this.scoped(actor, request, () => this.events.history(threadId));
  }

  @Patch(':threadId')
  rename(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Param('threadId') threadId: string,
    @Body() body: { name?: string; title?: string; archived?: boolean },
  ) {
    return this.scoped(actor, request, async () => {
      if (body.archived === false)
        return this.toClientThread(await this.threads.unarchive(threadId));
      if (body.archived === true)
        return this.toClientThread(await this.threads.archive(threadId));
      const title = (body.name ?? body.title ?? 'New conversation')
        .trim()
        .slice(0, 120);
      return this.toClientThread(await this.threads.rename(threadId, title));
    });
  }

  @Delete(':threadId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async archive(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Param('threadId') threadId: string,
  ) {
    await this.scoped(actor, request, () => this.threads.archive(threadId));
  }

  @Post(':threadId/archive')
  archiveExplicit(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Param('threadId') threadId: string,
  ) {
    return this.scoped(actor, request, () => this.threads.archive(threadId));
  }

  @Post(':threadId/unarchive')
  unarchive(
    @Req() request: Request,
    @InternalActor() actor: AgentActor,
    @Param('threadId') threadId: string,
  ) {
    return this.scoped(actor, request, async () =>
      this.toClientThread(await this.threads.unarchive(threadId)),
    );
  }

  private toClientThread(thread: {
    id: string;
    agentId: string;
    title: string;
    archivedAt: string | null;
    createdAt: string;
    updatedAt: string;
  }) {
    return {
      id: thread.id,
      agentId: thread.agentId,
      name: thread.title,
      archived: Boolean(thread.archivedAt),
      createdAt: thread.createdAt,
      updatedAt: thread.updatedAt,
      lastRunAt: thread.updatedAt,
    };
  }

  private scoped<T>(
    actor: AgentActor,
    request: Request,
    callback: () => T,
  ): T {
    return this.context.run(
      {
        userId: actor.userId,
        role: actor.role,
        authorization: request.header('authorization'),
      },
      callback,
    );
  }
}
