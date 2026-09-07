import { RpcException } from '@nestjs/microservices';
import { UserRole, UserStatus } from '../generated/prisma/client';
import type { PrismaService } from './prisma.service';
import { UsersService } from './users.service';

const now = new Date('2026-08-08T00:00:00.000Z');
const storedUser = {
  id: 'user_local_1',
  clerkId: 'user_clerk_1',
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'User',
  displayName: 'Admin User',
  imageUrl: null,
  role: UserRole.ADMIN,
  status: UserStatus.ACTIVE,
  clerkCreatedAt: now,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
};

describe('UsersService', () => {
  it('returns an active user by Clerk id', async () => {
    const prisma = {
      user: { findUnique: jest.fn().mockResolvedValue(storedUser) },
    };
    const service = new UsersService(prisma as unknown as PrismaService);

    await expect(
      service.getUserByClerkId({ clerkId: storedUser.clerkId }),
    ).resolves.toMatchObject({
      id: storedUser.id,
      clerkId: storedUser.clerkId,
      role: 'admin',
      status: 'active',
    });
  });

  it('does not expose a soft-deleted user', async () => {
    const prisma = {
      user: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ ...storedUser, status: UserStatus.DELETED }),
      },
    };
    const service = new UsersService(prisma as unknown as PrismaService);

    await expect(
      service.getUserByClerkId({ clerkId: storedUser.clerkId }),
    ).rejects.toBeInstanceOf(RpcException);
  });

  it('treats an already processed Clerk event as idempotent', async () => {
    const transaction = {
      clerkWebhookEvent: {
        findUnique: jest.fn().mockResolvedValue({ eventId: 'evt_1' }),
        create: jest.fn(),
      },
      user: {
        findUnique: jest.fn().mockResolvedValue(storedUser),
        upsert: jest.fn(),
      },
    };
    const prisma = {
      $transaction: jest
        .fn()
        .mockImplementation((callback: (tx: typeof transaction) => unknown) =>
          callback(transaction),
        ),
    };
    const service = new UsersService(prisma as unknown as PrismaService);

    await expect(
      service.upsertClerkUser({
        eventId: 'evt_1',
        eventType: 'user.updated',
        clerkId: storedUser.clerkId,
        email: storedUser.email,
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        displayName: storedUser.displayName,
        imageUrl: '',
        role: 'admin',
        payloadJson: '{}',
        clerkCreatedAt: now.toISOString(),
      }),
    ).resolves.toMatchObject({ clerkId: storedUser.clerkId, role: 'admin' });
    expect(transaction.user.upsert).not.toHaveBeenCalled();
    expect(transaction.clerkWebhookEvent.create).not.toHaveBeenCalled();
  });

  it('returns a cursor when another page exists', async () => {
    const second = { ...storedUser, id: 'user_local_2' };
    const prisma = {
      user: { findMany: jest.fn().mockResolvedValue([storedUser, second]) },
    };
    const service = new UsersService(prisma as unknown as PrismaService);

    await expect(
      service.listUsers({
        page: { pageSize: 1, pageToken: '' },
        search: '',
        role: '',
        status: '',
      }),
    ).resolves.toMatchObject({
      users: [{ id: storedUser.id }],
      pageInfo: { hasNextPage: true, nextPageToken: storedUser.id },
    });
  });
});
