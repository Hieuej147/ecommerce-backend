import { NotFoundException } from '@nestjs/common';
import { AgentRequestContextService } from '../context/agent-request-context.service';
import { AgentThreadStore } from './agent-thread.store';

describe('AgentThreadStore ownership', () => {
  it('never returns a thread owned by another Clerk user', async () => {
    const findFirst = jest.fn().mockResolvedValue(null);
    const prisma = { conversationThread: { findFirst } } as never;
    const context = new AgentRequestContextService();
    const store = new AgentThreadStore(prisma, context);

    await context.run({ userId: 'user_a', role: 'customer' }, async () => {
      expect(await store.get('thread_b')).toBeNull();
      await expect(store.requireOwned('thread_b')).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
    expect(findFirst).toHaveBeenCalledWith({
      where: { id: 'thread_b', userId: 'user_a' },
    });
  });

  it('lists only active threads by default and archived threads for recovery', async () => {
    const findMany = jest.fn().mockResolvedValue([
      {
        id: 'thread_archived',
        agentId: 'dashboard',
        title: 'Archived',
        status: 'IDLE',
        archivedAt: new Date('2026-08-04T00:00:00.000Z'),
        createdAt: new Date('2026-08-03T00:00:00.000Z'),
        updatedAt: new Date('2026-08-04T00:00:00.000Z'),
      },
    ]);
    const prisma = { conversationThread: { findMany } } as never;
    const context = new AgentRequestContextService();
    const store = new AgentThreadStore(prisma, context);

    await context.run({ userId: 'user_a', role: 'customer' }, async () => {
      await store.list();
      expect(findMany.mock.calls[0][0].where.archivedAt).toBeNull();
      await store.list({ includeArchived: true });
      expect(findMany.mock.calls[1][0].where.archivedAt).toEqual({ not: null });
    });
  });

  it('turns delete into an archive operation', async () => {
    const findFirst = jest
      .fn()
      .mockResolvedValue({ id: 't1', userId: 'user_a' });
    const update = jest.fn().mockResolvedValue({
      id: 't1',
      agentId: 'dashboard',
      title: 'Thread',
      status: 'IDLE',
      archivedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const prisma = { conversationThread: { findFirst, update } } as never;
    const context = new AgentRequestContextService();
    const store = new AgentThreadStore(prisma, context);

    await context.run({ userId: 'user_a', role: 'customer' }, async () =>
      store.delete('t1'),
    );
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          archivedAt: expect.any(Date),
          status: 'IDLE',
        }),
      }),
    );
    expect(
      (prisma as never as { conversationThread: { delete?: jest.Mock } })
        .conversationThread.delete,
    ).toBeUndefined();
  });
});
