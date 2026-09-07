import type { BaseEvent, RunAgentInput } from '@ag-ui/client';

export type ThreadStatus = 'idle' | 'running' | 'deleting';
export type RunStatus = 'running' | 'completed' | 'error' | 'stopped';
export type AgentRunKind = 'root' | 'subagent';

export interface ThreadMeta {
  id: string;
  agentId: string;
  title: string;
  status: ThreadStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ThreadListOptions {
  agentId?: string;
  limit?: number;
  cursor?: string;
  includeArchived?: boolean;
}

export interface ThreadStore {
  create(agentId: string, threadId?: string): Promise<ThreadMeta>;
  get(threadId: string): Promise<ThreadMeta | null>;
  list(
    options?: ThreadListOptions,
  ): Promise<{ threads: ThreadMeta[]; nextCursor: string | null }>;
  rename(threadId: string, title: string): Promise<ThreadMeta>;
  renameIfTitle(
    threadId: string,
    expectedTitle: string,
    title: string,
  ): Promise<ThreadMeta | null>;
  touch(threadId: string): Promise<ThreadMeta>;
  setStatus(threadId: string, status: ThreadStatus): Promise<ThreadMeta>;
  archive(threadId: string): Promise<ThreadMeta>;
  unarchive(threadId: string): Promise<ThreadMeta>;
}

export interface StoredRunEvent {
  threadId: string;
  runId: string;
  sequence: number;
  event: BaseEvent;
}

export interface EventStore {
  startRun(
    threadId: string,
    runId: string,
    input: RunAgentInput,
    agentId: string,
    metadata?: {
      parentRunId?: string;
      rootRunId?: string;
      depth?: number;
      kind?: AgentRunKind;
    },
  ): Promise<void>;
  append(event: StoredRunEvent): Promise<void>;
  appendBatch?(events: StoredRunEvent[]): Promise<void>;
  replaceRunEvents(
    threadId: string,
    runId: string,
    events: StoredRunEvent[],
  ): Promise<void>;
  finishRun(threadId: string, runId: string, status: RunStatus): Promise<void>;
  history(threadId: string): Promise<StoredRunEvent[]>;
  active(
    threadId: string,
  ): Promise<{ runId: string; status: 'running' } | null>;
}

export interface RunCoordinator {
  acquire(threadId: string, runId: string, ttlMs: number): Promise<boolean>;
  renew(threadId: string, runId: string, ttlMs: number): Promise<boolean>;
  release(threadId: string, runId: string): Promise<void>;
  publish(threadId: string, event: StoredRunEvent): Promise<void>;
  subscribe(
    threadId: string,
    listener: (event: StoredRunEvent) => void,
  ): Promise<() => Promise<void>>;
  close?(): Promise<void> | void;
}
