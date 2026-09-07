import { UsersController } from './users.controller';
import type { UsersService } from './users.service';

describe('UsersController', () => {
  it('returns the current user profile', async () => {
    const actor = {
      userId: 'user_test',
      sessionId: 'sess_test',
      orgId: null,
      orgRole: null,
      orgSlug: null,
      role: 'customer',
      requestId: 'req_test',
    } as const;
    const profile = {
      clerkId: actor.userId,
      email: 'customer@example.com',
      role: actor.role,
    };
    const users = {
      current: jest.fn().mockResolvedValue(profile),
    };
    const controller = new UsersController(users as unknown as UsersService);

    await expect(controller.getCurrentUser(actor)).resolves.toEqual(profile);
    expect(users.current).toHaveBeenCalledWith(actor);
  });
});
