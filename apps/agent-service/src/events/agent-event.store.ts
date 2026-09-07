import { Injectable, NotFoundException } from '@nestjs/common';
import { AgentRunKind, AgentRunStatus, Prisma } from '../../generated/prisma';
import type { BaseEvent, RunAgentInput } from '@ag-ui/client';
import { AgentPrismaService } from '../persistence/agent-prisma.service';
import { AgentRequestContextService } from '../context/agent-request-context.service';

export interface StoredRunEvent {
  threadId: string;
  runId: string;
  sequence: number;
  event: BaseEvent;
}

@Injectable()
export class PrismaEventStore {
  constructor(
    private readonly prisma: AgentPrismaService,
    private readonly context: AgentRequestContextService,
  ) {}

  private async requireOwned(threadId: string) {
    const row = await this.prisma.conversationThread.findFirst({
      where: { id: threadId, userId: this.context.require().userId },
    });
    if (!row) throw new NotFoundException('Thread not found');
    return row;
  }

  async startRun(
    threadId: string,
    runId: string,
    input: RunAgentInput,
    agentId: string,
    metadata: {
      parentRunId?: string;
      rootRunId?: string;
      depth?: number;
      kind?: 'root' | 'subagent';
    } = {},
  ) {
    await this.requireOwned(threadId);
    const parent = metadata.parentRunId
      ? await this.prisma.agentRun.findFirst({
          where: { id: metadata.parentRunId, threadId },
          select: { rootRunId: true, depth: true },
        })
      : null;
    if (metadata.parentRunId && !parent)
      throw new NotFoundException('Parent run not found');
    return this.prisma.agentRun.create({
      data: {
        id: runId,
        threadId,
        agentId,
        parentRunId: metadata.parentRunId,
        rootRunId: metadata.rootRunId ?? parent?.rootRunId ?? runId,
        depth: metadata.depth ?? (parent ? parent.depth + 1 : 0),
        kind:
          metadata.kind === 'subagent'
            ? AgentRunKind.SUBAGENT
            : AgentRunKind.ROOT,
        input: input as unknown as Prisma.InputJsonValue,
      },
    });
  }

  async append(event: StoredRunEvent) {
    await this.requireOwned(event.threadId);
    return this.prisma.agentEvent.upsert({
      where: {
        runId_sequence: { runId: event.runId, sequence: event.sequence },
      },
      create: {
        runId: event.runId,
        threadId: event.threadId,
        sequence: event.sequence,
        event: event.event as unknown as Prisma.InputJsonValue,
      },
      update: { event: event.event as unknown as Prisma.InputJsonValue },
    });
  }

  async appendBatch(events: StoredRunEvent[]) {
    if (!events.length) return;
    await this.requireOwned(events[0].threadId);
    await this.prisma.$transaction(
      events.map((event) =>
        this.prisma.agentEvent.upsert({
          where: {
            runId_sequence: { runId: event.runId, sequence: event.sequence },
          },
          create: {
            runId: event.runId,
            threadId: event.threadId,
            sequence: event.sequence,
            event: event.event as unknown as Prisma.InputJsonValue,
          },
          update: { event: event.event as unknown as Prisma.InputJsonValue },
        }),
      ),
    );
  }

  async replaceRunEvents(
    threadId: string,
    runId: string,
    events: StoredRunEvent[],
  ) {
    await this.requireOwned(threadId);
    await this.prisma.$transaction(async (tx) => {
      await tx.agentEvent.deleteMany({ where: { threadId, runId } });
      if (events.length)
        await tx.agentEvent.createMany({
          data: events.map((event) => ({
            runId: event.runId,
            threadId: event.threadId,
            sequence: event.sequence,
            event: event.event as unknown as Prisma.InputJsonValue,
          })),
        });
    });
  }

  async finishRun(
    threadId: string,
    runId: string,
    status: 'completed' | 'error' | 'stopped',
  ) {
    await this.requireOwned(threadId);
    await this.prisma.agentRun.updateMany({
      where: { id: runId, threadId },
      data: {
        status: {
          completed: AgentRunStatus.COMPLETED,
          error: AgentRunStatus.ERROR,
          stopped: AgentRunStatus.STOPPED,
        }[status],
        finishedAt: new Date(),
      },
    });
  }

  async history(threadId: string): Promise<StoredRunEvent[]> {
    await this.requireOwned(threadId);
    const rows = await this.prisma.agentEvent.findMany({
      where: { threadId },
      orderBy: [{ run: { startedAt: 'asc' } }, { sequence: 'asc' }],
    });
    return rows.map((row) => ({
      threadId: row.threadId,
      runId: row.runId,
      sequence: row.sequence,
      event: row.event as unknown as BaseEvent,
    }));
  }

  async active(threadId: string) {
    await this.requireOwned(threadId);
    const run = await this.prisma.agentRun.findFirst({
      where: { threadId, status: AgentRunStatus.RUNNING },
      select: { id: true },
    });
    return run ? { runId: run.id, status: 'running' as const } : null;
  }

  async removeThread(threadId: string) {
    await this.requireOwned(threadId);
    await this.prisma.agentRun.deleteMany({ where: { threadId } });
  }
}

/** @deprecated Use PrismaEventStore. Kept as a compatibility export for existing imports. */
export class AgentEventStore extends PrismaEventStore {}
