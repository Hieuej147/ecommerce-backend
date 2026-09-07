import type { RunCoordinator, StoredRunEvent } from './types';

export interface RedisConnection {
  set(
    key: string,
    value: string,
    mode: 'PX',
    ttlMs: number,
    condition: 'NX',
  ): Promise<string | null>;
  eval(
    script: string,
    keyCount: number,
    key: string,
    ...args: Array<string | number>
  ): Promise<unknown>;
  publish(channel: string, payload: string): Promise<number>;
  duplicate(): RedisConnection;
  on(
    event: 'message',
    listener: (channel: string, payload: string) => void,
  ): this;
  off(
    event: 'message',
    listener: (channel: string, payload: string) => void,
  ): this;
  subscribe(channel: string): Promise<unknown>;
  unsubscribe(channel: string): Promise<unknown>;
  quit(): Promise<string>;
}

const releaseScript =
  "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
const renewScript =
  "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('pexpire', KEYS[1], ARGV[2]) else return 0 end";

export class RedisRunCoordinator implements RunCoordinator {
  private readonly subscriber: RedisConnection;
  constructor(
    private readonly redis: RedisConnection,
    private readonly prefix = 'microservice-ecommerce:threads',
  ) {
    this.subscriber = redis.duplicate();
  }
  private lockKey(threadId: string): string {
    return `${this.prefix}:lock:${threadId}`;
  }
  private channel(threadId: string): string {
    return `${this.prefix}:events:${threadId}`;
  }
  async acquire(
    threadId: string,
    runId: string,
    ttlMs: number,
  ): Promise<boolean> {
    return (
      (await this.redis.set(
        this.lockKey(threadId),
        runId,
        'PX',
        ttlMs,
        'NX',
      )) === 'OK'
    );
  }
  async renew(
    threadId: string,
    runId: string,
    ttlMs: number,
  ): Promise<boolean> {
    return (
      Number(
        await this.redis.eval(
          renewScript,
          1,
          this.lockKey(threadId),
          runId,
          ttlMs,
        ),
      ) === 1
    );
  }
  async release(threadId: string, runId: string): Promise<void> {
    await this.redis.eval(releaseScript, 1, this.lockKey(threadId), runId);
  }
  async publish(threadId: string, event: StoredRunEvent): Promise<void> {
    await this.redis.publish(this.channel(threadId), JSON.stringify(event));
  }
  async subscribe(
    threadId: string,
    listener: (event: StoredRunEvent) => void,
  ): Promise<() => Promise<void>> {
    const channel = this.channel(threadId);
    const handler = (received: string, payload: string) => {
      if (received !== channel) return;
      try {
        listener(JSON.parse(payload) as StoredRunEvent);
      } catch {
        /* malformed events are ignored */
      }
    };
    this.subscriber.on('message', handler);
    await this.subscriber.subscribe(channel);
    return async () => {
      this.subscriber.off('message', handler);
      await this.subscriber.unsubscribe(channel);
    };
  }
  async close(): Promise<void> {
    await this.subscriber.quit();
    await this.redis.quit();
  }
}
