import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { InMemoryAgentRunner } from '@copilotkit/runtime/v2';
import type { BaseEvent } from '@ag-ui/client';
import { ReplaySubject } from 'rxjs';
import { PrismaEventStore } from '../events/agent-event.store';
import { AgentEventSerializer } from '../events/event-serializer';
import { EventCoalescer, type PersistedEvent } from '../events/event-coalescer';
import type { RunCoordinator } from '../../../../libs/thread-manager/src/types';
import { RUN_COORDINATOR } from '../coordination/run-coordinator.provider';
import { AgentRequestContextService } from '../context/agent-request-context.service';
import { AgentThreadStore } from '../threads/agent-thread.store';

interface LocalRun {
  runId: string;
  subject: ReplaySubject<BaseEvent>;
  pendingWrites: Promise<void>;
  coalescer: EventCoalescer;
  persistedRawCount: number;
  terminalSeen: boolean;
  nextSequence: () => number;
  renewTimer?: NodeJS.Timeout;
}

/**
 * Durable AG-UI runner. The CopilotKit runner remains responsible for talking
 * to the remote agent; this adapter owns thread authorization, durable event
 * history, reconnect replay, and one-run-per-thread coordination.
 */
@Injectable()
export class PersistedAgentRunner
  extends InMemoryAgentRunner
  implements OnModuleDestroy
{
  private readonly localRuns = new Map<string, LocalRun>();
  private readonly finishing = new Set<string>();
  private readonly serializer = new AgentEventSerializer();

  constructor(
    private readonly events: PrismaEventStore,
    private readonly threads: AgentThreadStore,
    private readonly requestContext: AgentRequestContextService,
    @Inject(RUN_COORDINATOR) private readonly coordinator: RunCoordinator,
  ) {
    super({ onConcurrentRun: 'throw' });
  }

  // RxJS is duplicated in the CopilotKit dependency tree (7.8.1) and the
  // Nest application (7.8.2). Keep the public adapter boundary untyped; the
  // actual stream values are AG-UI BaseEvent objects.
  run(request: any): any {
    const output = new ReplaySubject<BaseEvent>();
    void this.startRun(request, output);
    return output.asObservable();
  }

  connect(request: any): any {
    const output = new ReplaySubject<BaseEvent>();
    void this.replay(request.threadId, output);
    return output.asObservable();
  }

  async isRunning(request: any): Promise<boolean> {
    return (
      (await this.events.active(request.threadId)) !== null ||
      (await super.isRunning(request))
    );
  }

  async stop(request: any): Promise<boolean | undefined> {
    const local = this.localRuns.get(request.threadId);
    const stopped = await super.stop(request).catch(() => false);
    const active =
      local ?? (await this.events.active(request.threadId).catch(() => null));
    if (!active && !stopped) return false;

    if (local) {
      const pending = local.coalescer.flushAll();
      local.pendingWrites = local.pendingWrites.then(() =>
        this.persist(request.threadId, local.runId, pending, local),
      );
      await local.pendingWrites;
    }
    if (active) {
      await this.events
        .finishRun(request.threadId, active.runId, 'stopped')
        .catch(() => undefined);
      this.localRuns.delete(request.threadId);
      await this.coordinator.release(request.threadId, active.runId);
    }
    await this.threads
      .setStatus(request.threadId, 'idle')
      .catch(() => undefined);
    return true;
  }

  async deleteThread(threadId: string): Promise<void> {
    const local = this.localRuns.get(threadId);
    await this.threads.setStatus(threadId, 'deleting');
    await super.stop({ threadId }).catch(() => false);
    if (local) await this.coordinator.release(threadId, local.runId);
    // Thread deletion is deliberately a soft delete. Events remain available
    // for audit/recovery and the UI simply excludes archived threads.
    await this.threads.archive(threadId);
    this.localRuns.delete(threadId);
  }

  async onModuleDestroy(): Promise<void> {
    for (const local of this.localRuns.values())
      if (local.renewTimer) clearInterval(local.renewTimer);
    await this.coordinator.close?.();
  }

  private async startRun(
    request: any,
    output: ReplaySubject<BaseEvent>,
  ): Promise<void> {
    this.requestContext.require();
    const agentId = request.agent.agentId ?? 'dashboard';
    const threadId = request.threadId;
    try {
      await this.threads.create(agentId, threadId);
      await this.threads.setStatus(threadId, 'running');
      if (
        !(await this.coordinator.acquire(
          threadId,
          request.input.runId,
          5 * 60_000,
        ))
      ) {
        throw new Error(`Thread "${threadId}" already has a running agent`);
      }
      await this.events.startRun(
        threadId,
        request.input.runId,
        request.input,
        agentId,
        {
          parentRunId: request.input.parentRunId,
          rootRunId: request.input.parentRunId
            ? undefined
            : request.input.runId,
          depth: request.input.parentRunId ? 1 : 0,
          kind: request.input.parentRunId ? 'subagent' : 'root',
        },
      );
      void this.setInitialTitle(threadId, request.input.messages);

      let sequence = 0;
      const state: LocalRun = {
        runId: request.input.runId,
        subject: output,
        pendingWrites: Promise.resolve(),
        coalescer: new EventCoalescer(),
        persistedRawCount: 0,
        terminalSeen: false,
        nextSequence: () => sequence++,
      };
      this.localRuns.set(threadId, state);
      state.renewTimer = setInterval(() => {
        void this.coordinator.renew(threadId, state.runId, 5 * 60_000);
      }, 60_000);

      super.run({ ...request, threadId }).subscribe({
        next: (event) => {
          output.next(event);
          state.terminalSeen ||=
            event.type === 'RUN_FINISHED' || event.type === 'RUN_ERROR';
          const pending = state.coalescer.push(event);
          state.pendingWrites = state.pendingWrites.then(() =>
            this.persist(threadId, state.runId, pending, state),
          );
        },
        error: (error: unknown) => {
          this.emitRunError(
            threadId,
            state,
            error instanceof Error ? error.message : String(error),
          );
          void this.finish(threadId, state.runId, 'error', output);
        },
        complete: () => {
          if (!state.terminalSeen) {
            this.emitRunError(
              threadId,
              state,
              'Run ended without emitting a terminal event',
            );
            void this.finish(threadId, state.runId, 'error', output);
          } else {
            void this.finish(threadId, state.runId, 'completed', output);
          }
        },
      });
    } catch (error) {
      await this.coordinator.release(threadId, request.input.runId);
      await this.threads.setStatus(threadId, 'idle').catch(() => undefined);
      output.error(error instanceof Error ? error : new Error(String(error)));
    }
  }

  private async finish(
    threadId: string,
    runId: string,
    status: 'completed' | 'error' | 'stopped',
    output: ReplaySubject<BaseEvent>,
  ): Promise<void> {
    const key = `${threadId}:${runId}`;
    if (this.finishing.has(key)) return;
    this.finishing.add(key);
    const state = this.localRuns.get(threadId);
    try {
      if (state) {
        const pending = state.coalescer.flushAll();
        state.pendingWrites = state.pendingWrites.then(() =>
          this.persist(threadId, runId, pending, state),
        );
        await state.pendingWrites;
      }
      const history = await this.events.history(threadId);
      const compacted = this.serializer.compact(
        history
          .filter((item) => item.runId === runId)
          .map((item) => item.event),
      );
      await this.events.replaceRunEvents(
        threadId,
        runId,
        compacted.map((event, sequence) => ({
          threadId,
          runId,
          sequence,
          event,
        })),
      );
      await this.events.finishRun(threadId, runId, status);
      if (state?.renewTimer) clearInterval(state.renewTimer);
      await this.coordinator.release(threadId, runId);
      this.localRuns.delete(threadId);
      await this.threads.setStatus(threadId, 'idle').catch(() => undefined);
      output.complete();
    } catch (error) {
      output.error(error instanceof Error ? error : new Error(String(error)));
    } finally {
      this.finishing.delete(key);
    }
  }

  private async replay(
    threadId: string,
    output: ReplaySubject<BaseEvent>,
  ): Promise<void> {
    try {
      const existing = await this.threads.get(threadId);
      if (!existing) await this.threads.create('dashboard', threadId);
      const history = await this.events.history(threadId);
      const grouped = new Map<string, BaseEvent[]>();
      for (const item of history)
        (
          grouped.get(item.runId) ??
          (grouped.set(item.runId, []), grouped.get(item.runId)!)
        ).push(item.event);
      for (const events of grouped.values())
        for (const event of this.serializer.compact(events)) output.next(event);
      const local = this.localRuns.get(threadId);
      if (!local) return output.complete();
      let seen = 0;
      const skip = local.persistedRawCount;
      local.subject.subscribe({
        next: (event) => {
          if (seen++ >= skip) output.next(event);
        },
        error: (error) => output.error(error),
        complete: () => output.complete(),
      });
    } catch (error) {
      output.error(error instanceof Error ? error : new Error(String(error)));
    }
  }

  private async persist(
    threadId: string,
    runId: string,
    events: PersistedEvent[],
    state: LocalRun,
  ): Promise<void> {
    if (!events.length) return;
    const rows = events.map(({ event, rawCount }) => ({
      threadId,
      runId,
      sequence: state.nextSequence(),
      event,
      rawCount,
    }));
    await this.events.appendBatch(
      rows.map(({ threadId: id, runId: rid, sequence, event }) => ({
        threadId: id,
        runId: rid,
        sequence,
        event,
      })),
    );
    await Promise.all(
      rows.map((row) =>
        this.coordinator.publish(threadId, {
          threadId,
          runId,
          sequence: row.sequence,
          event: row.event,
        }),
      ),
    );
    state.persistedRawCount += rows.reduce(
      (total, row) => total + row.rawCount,
      0,
    );
  }

  private async setInitialTitle(
    threadId: string,
    messages: unknown,
  ): Promise<void> {
    const first = Array.isArray(messages)
      ? (messages.find((message) => {
          const value = message as { role?: unknown; content?: unknown };
          return (
            value.role === 'user' &&
            typeof value.content === 'string' &&
            value.content.trim()
          );
        }) as { content: string } | undefined)
      : undefined;
    if (!first) return;
    const title = first.content
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 60)
      .replace(/[.!?。！？]+$/u, '')
      .trim();
    if (title)
      await this.threads
        .renameIfTitle(threadId, 'New conversation', title)
        .catch(() => null);
  }

  private emitRunError(
    threadId: string,
    state: LocalRun,
    message: string,
  ): void {
    if (state.terminalSeen) return;
    state.terminalSeen = true;
    const event = {
      type: 'RUN_ERROR',
      threadId,
      runId: state.runId,
      message,
    } as BaseEvent;
    state.subject.next(event);
    const pending = state.coalescer.push(event);
    state.pendingWrites = state.pendingWrites.then(() =>
      this.persist(threadId, state.runId, pending, state),
    );
  }
}
