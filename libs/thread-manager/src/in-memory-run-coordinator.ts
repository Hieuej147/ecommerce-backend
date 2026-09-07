import type { RunCoordinator, StoredRunEvent } from './types';

/** Test/single-process coordinator only. Production must use Redis. */
export class InMemoryRunCoordinator implements RunCoordinator {
  private readonly locks = new Map<
    string,
    { runId: string; expiresAt: number }
  >();
  private readonly listeners = new Map<
    string,
    Set<(event: StoredRunEvent) => void>
  >();

  async acquire(
    threadId: string,
    runId: string,
    ttlMs: number,
  ): Promise<boolean> {
    const current = this.locks.get(threadId);
    if (current && current.expiresAt > Date.now() && current.runId !== runId)
      return false;
    this.locks.set(threadId, { runId, expiresAt: Date.now() + ttlMs });
    return true;
  }
  async renew(
    threadId: string,
    runId: string,
    ttlMs: number,
  ): Promise<boolean> {
    const current = this.locks.get(threadId);
    if (!current || current.runId !== runId || current.expiresAt <= Date.now())
      return false;
    current.expiresAt = Date.now() + ttlMs;
    return true;
  }
  async release(threadId: string, runId: string): Promise<void> {
    if (this.locks.get(threadId)?.runId === runId) this.locks.delete(threadId);
  }
  async publish(threadId: string, event: StoredRunEvent): Promise<void> {
    for (const listener of this.listeners.get(threadId) ?? []) listener(event);
  }
  async subscribe(
    threadId: string,
    listener: (event: StoredRunEvent) => void,
  ): Promise<() => Promise<void>> {
    const listeners = this.listeners.get(threadId) ?? new Set();
    listeners.add(listener);
    this.listeners.set(threadId, listeners);
    return async () => {
      listeners.delete(listener);
      if (!listeners.size) this.listeners.delete(threadId);
    };
  }
}
