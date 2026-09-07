import { toActorContext } from './actor-context';

describe('toActorContext', () => {
  it('maps Clerk auth claims to the actor context', () => {
    expect(
      toActorContext({
        userId: 'user_test',
        sessionId: 'sess_test',
        orgId: 'org_test',
        orgRole: 'org:admin',
        orgSlug: 'demo-store',
        role: 'admin',
        requestId: 'req_test',
      }),
    ).toEqual({
      userId: 'user_test',
      sessionId: 'sess_test',
      orgId: 'org_test',
      orgRole: 'org:admin',
      orgSlug: 'demo-store',
      role: 'admin',
      requestId: 'req_test',
    });
  });

  it('rejects a missing user id', () => {
    expect(() => toActorContext({ userId: null })).toThrow(
      'CurrentActor is only available on authenticated routes',
    );
  });
});
