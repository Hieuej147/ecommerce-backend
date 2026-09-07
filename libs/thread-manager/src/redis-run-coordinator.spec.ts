import {
  RedisRunCoordinator,
  type RedisConnection,
} from './redis-run-coordinator';

describe('RedisRunCoordinator', () => {
  it('uses owner-aware lock scripts and publishes JSON events', async () => {
    const calls: Array<{ method: string; args: unknown[] }> = [];
    const fake: RedisConnection = {
      set: jest.fn(async (...args: unknown[]) => {
        calls.push({ method: 'set', args });
        return 'OK';
      }) as RedisConnection['set'],
      eval: jest.fn(async (...args: unknown[]) => {
        calls.push({ method: 'eval', args });
        return 1;
      }) as RedisConnection['eval'],
      publish: jest.fn(async (...args: unknown[]) => {
        calls.push({ method: 'publish', args });
        return 1;
      }) as RedisConnection['publish'],
      duplicate: jest.fn(() => fake),
      on: jest.fn(function (this: RedisConnection) {
        return this;
      }) as RedisConnection['on'],
      off: jest.fn(function (this: RedisConnection) {
        return this;
      }) as RedisConnection['off'],
      subscribe: jest.fn(async () => undefined),
      unsubscribe: jest.fn(async () => undefined),
      quit: jest.fn(async () => 'OK'),
    };
    const coordinator = new RedisRunCoordinator(fake, 'test');

    expect(await coordinator.acquire('thread-1', 'run-1', 300_000)).toBe(true);
    expect(await coordinator.renew('thread-1', 'run-1', 300_000)).toBe(true);
    await coordinator.release('thread-1', 'run-1');
    await coordinator.publish('thread-1', {
      threadId: 'thread-1',
      runId: 'run-1',
      sequence: 0,
      event: { type: 'ACTIVITY_SNAPSHOT' } as never,
    });

    expect(calls.map((call) => call.method)).toEqual([
      'set',
      'eval',
      'eval',
      'publish',
    ]);
    expect(fake.set).toHaveBeenCalledWith(
      'test:lock:thread-1',
      'run-1',
      'PX',
      300_000,
      'NX',
    );
  });
});
