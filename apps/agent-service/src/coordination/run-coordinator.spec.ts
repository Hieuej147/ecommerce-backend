import { InMemoryRunCoordinator } from './run-coordinator';

describe('InMemoryRunCoordinator', () => {
  it('allows only one live run per thread and releases the lock by owner', async () => {
    const coordinator = new InMemoryRunCoordinator();
    expect(await coordinator.acquire('t1', 'r1', 1000)).toBe(true);
    expect(await coordinator.acquire('t1', 'r2', 1000)).toBe(false);
    await coordinator.release('t1', 'r2');
    expect(await coordinator.acquire('t1', 'r2', 1000)).toBe(false);
    await coordinator.release('t1', 'r1');
    expect(await coordinator.acquire('t1', 'r2', 1000)).toBe(true);
  });

  it('renews only the current owner and expires stale locks', async () => {
    const coordinator = new InMemoryRunCoordinator();
    expect(await coordinator.acquire('t1', 'r1', 10)).toBe(true);
    expect(await coordinator.renew('t1', 'r2', 1000)).toBe(false);
    await new Promise((resolve) => setTimeout(resolve, 15));
    expect(await coordinator.renew('t1', 'r1', 1000)).toBe(false);
  });
});
