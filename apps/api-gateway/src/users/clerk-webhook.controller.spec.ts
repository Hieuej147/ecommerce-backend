import { BadRequestException } from '@nestjs/common';
import { verifyWebhook } from '@clerk/express/webhooks';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request';
import { ClerkWebhookController } from './clerk-webhook.controller';
import type { UsersGrpcService } from './users.grpc.service';
import type { InngestEventsService } from '../inngest/inngest.client';

jest.mock('@clerk/express/webhooks', () => ({
  verifyWebhook: jest.fn(),
}));

const mockedVerifyWebhook = jest.mocked(verifyWebhook);

function request(eventId = 'evt_1') {
  return {
    body: { parsed: true },
    rawBody: Buffer.from('{}'),
    header: jest.fn((name: string) =>
      name === 'svix-id' ? eventId : undefined,
    ),
  } as unknown as AuthenticatedRequest;
}

describe('ClerkWebhookController', () => {
  beforeEach(() => jest.clearAllMocks());

  it('verifies and forwards a Clerk user event to Users Service', async () => {
    mockedVerifyWebhook.mockResolvedValue({
      type: 'user.updated',
      data: {
        id: 'user_clerk_1',
        email_addresses: [
          { id: 'email_1', email_address: 'admin@example.com' },
        ],
        primary_email_address_id: 'email_1',
        first_name: 'Admin',
        last_name: 'User',
        username: null,
        image_url: 'https://example.com/avatar.png',
        public_metadata: { role: 'admin' },
        created_at: 1_786_147_200_000,
      },
    } as never);
    const users = { upsert: jest.fn().mockResolvedValue({}) };
    const inngest = { userCreated: jest.fn().mockResolvedValue(undefined) };
    const controller = new ClerkWebhookController(
      users as unknown as UsersGrpcService,
      inngest as unknown as InngestEventsService,
    );

    await expect(controller.handle(request())).resolves.toEqual({
      received: true,
    });
    expect(users.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        eventId: 'evt_1',
        clerkId: 'user_clerk_1',
        email: 'admin@example.com',
        role: 'admin',
      }),
    );
  });

  it('rejects an invalid signature before calling Users Service', async () => {
    mockedVerifyWebhook.mockRejectedValue(new Error('invalid signature'));
    const users = { upsert: jest.fn(), remove: jest.fn() };
    const inngest = { userCreated: jest.fn() };
    const controller = new ClerkWebhookController(
      users as unknown as UsersGrpcService,
      inngest as unknown as InngestEventsService,
    );

    await expect(controller.handle(request())).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(users.upsert).not.toHaveBeenCalled();
    expect(users.remove).not.toHaveBeenCalled();
  });
});
