import { AgentRequestContextService } from './agent-request-context.service';

describe('AgentRequestContextService', () => {
  it('keeps identity across asynchronous work', async () => {
    const service = new AgentRequestContextService();
    await service.run({ userId: 'user_123', role: 'admin', authorization: 'Bearer token' }, async () => {
      await Promise.resolve();
      expect(service.require()).toEqual({ userId: 'user_123', role: 'admin', authorization: 'Bearer token' });
    });
  });

  it('rejects access outside a request', () => {
    const service = new AgentRequestContextService();
    expect(() => service.require()).toThrow('Agent request context is unavailable');
  });
});
