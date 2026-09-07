import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { PrismaService } from '../prisma/prisma.service';
import type { ActorContext } from '../auth/types/actor-context';
import { NotFoundException } from '@nestjs/common';

describe('NotificationsService', () => {
  let service: NotificationsService;
  let prisma: {
    notification: {
      findMany: jest.Mock;
      count: jest.Mock;
      findFirst: jest.Mock;
      update: jest.Mock;
      updateMany: jest.Mock;
    };
  };

  const customerActor: ActorContext = {
    userId: 'user_cust_1',
    sessionId: 'sess_1',
    orgId: null,
    orgRole: null,
    orgSlug: null,
    role: 'customer',
    requestId: 'req_1',
  };

  const adminActor: ActorContext = {
    userId: 'user_admin_1',
    sessionId: 'sess_2',
    orgId: null,
    orgRole: null,
    orgSlug: null,
    role: 'admin',
    requestId: 'req_2',
  };

  beforeEach(async () => {
    prisma = {
      notification: {
        findMany: jest.fn(),
        count: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('lists notifications for customer scoping to userId', async () => {
    const mockDate = new Date();
    prisma.notification.findMany.mockResolvedValue([
      {
        id: 'notif_1',
        userId: 'user_cust_1',
        targetRole: 'CUSTOMER',
        type: 'ORDER_CREATED',
        title: 'Order Created',
        message: 'Your order was created',
        data: { orderId: 'ord_123' },
        href: '/orders',
        read: false,
        readAt: null,
        createdAt: mockDate,
      },
    ]);

    const result = await service.list(customerActor);

    expect(prisma.notification.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId: 'user_cust_1' },
      }),
    );
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('notif_1');
    expect(result[0].orderId).toBe('ord_123');
  });

  it('lists notifications for admin scoping to ADMIN role or admin userId', async () => {
    prisma.notification.findMany.mockResolvedValue([]);

    await service.list(adminActor, { unreadOnly: true, type: 'orders' });

    expect(prisma.notification.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          OR: [{ targetRole: 'ADMIN' }, { userId: 'user_admin_1' }],
          read: false,
          type: { in: ['ORDER_CREATED', 'ORDER_SHIPPED', 'ORDER_CANCELLED'] },
        },
      }),
    );
  });

  it('gets unread count for customer', async () => {
    prisma.notification.count.mockResolvedValue(5);

    const result = await service.getUnreadCount(customerActor);

    expect(prisma.notification.count).toHaveBeenCalledWith({
      where: { userId: 'user_cust_1', read: false },
    });
    expect(result).toEqual({ unreadCount: 5 });
  });

  it('marks a notification as read when it belongs to customer', async () => {
    const mockDate = new Date();
    prisma.notification.findFirst.mockResolvedValue({ id: 'notif_1', userId: 'user_cust_1' });
    prisma.notification.update.mockResolvedValue({
      id: 'notif_1',
      read: true,
      readAt: mockDate,
    });

    const result = await service.markAsRead('notif_1', customerActor);

    expect(prisma.notification.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'notif_1' },
        data: expect.objectContaining({ read: true }),
      }),
    );
    expect(result.success).toBe(true);
    expect(result.read).toBe(true);
  });

  it('throws NotFoundException when marking a notification not belonging to actor', async () => {
    prisma.notification.findFirst.mockResolvedValue(null);

    await expect(service.markAsRead('notif_foreign', customerActor)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('marks all as read for user scope', async () => {
    prisma.notification.updateMany.mockResolvedValue({ count: 3 });

    const result = await service.markAllAsRead(customerActor);

    expect(prisma.notification.updateMany).toHaveBeenCalledWith({
      where: { userId: 'user_cust_1', read: false },
      data: expect.objectContaining({ read: true }),
    });
    expect(result).toEqual({ success: true, count: 3 });
  });
});
