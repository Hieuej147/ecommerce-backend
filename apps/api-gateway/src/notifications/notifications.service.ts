import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { ActorContext } from '../auth/types/actor-context';
import type { NotificationType } from '@prisma/client';

export interface ListNotificationsQuery {
  limit?: number | string;
  unreadOnly?: boolean | string;
  type?: string;
  cursor?: string;
}

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  private buildActorWhere(actor: ActorContext) {
    if (actor.role === 'admin') {
      return {
        OR: [
          { targetRole: 'ADMIN' },
          { userId: actor.userId },
        ],
      };
    }
    return {
      userId: actor.userId,
    };
  }

  async list(actor: ActorContext, query?: ListNotificationsQuery) {
    const actorWhere = this.buildActorWhere(actor);
    const where: Record<string, unknown> = { ...actorWhere };

    if (query?.unreadOnly === true || query?.unreadOnly === 'true') {
      where.read = false;
    }

    if (query?.type) {
      if (query.type === 'orders') {
        where.type = { in: ['ORDER_CREATED', 'ORDER_SHIPPED', 'ORDER_CANCELLED'] };
      } else if (query.type === 'payments') {
        where.type = { in: ['PAYMENT_SUCCESS', 'PAYMENT_FAILED'] };
      } else if (query.type !== 'all') {
        where.type = query.type as NotificationType;
      }
    }

    const limit = Math.min(Math.max(Number(query?.limit) || 50, 1), 100);

    const items = await this.prisma.notification.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return items.map((item) => ({
      id: item.id,
      userId: item.userId,
      targetRole: item.targetRole,
      type: item.type,
      title: item.title,
      message: item.message,
      data: item.data as Record<string, unknown> | null,
      href: item.href,
      read: item.read,
      readAt: item.readAt ? item.readAt.toISOString() : null,
      createdAt: item.createdAt.toISOString(),
      orderId: (item.data as any)?.orderId ? String((item.data as any).orderId) : undefined,
    }));
  }

  async getUnreadCount(actor: ActorContext) {
    const actorWhere = this.buildActorWhere(actor);
    const unreadCount = await this.prisma.notification.count({
      where: {
        ...actorWhere,
        read: false,
      },
    });
    return { unreadCount };
  }

  async markAsRead(id: string, actor: ActorContext) {
    const actorWhere = this.buildActorWhere(actor);
    const existing = await this.prisma.notification.findFirst({
      where: {
        id,
        ...actorWhere,
      },
    });

    if (!existing) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    const updated = await this.prisma.notification.update({
      where: { id },
      data: {
        read: true,
        readAt: new Date(),
      },
    });

    return {
      id: updated.id,
      read: updated.read,
      readAt: updated.readAt?.toISOString() || null,
      success: true,
    };
  }

  async markAllAsRead(actor: ActorContext) {
    const actorWhere = this.buildActorWhere(actor);
    const result = await this.prisma.notification.updateMany({
      where: {
        ...actorWhere,
        read: false,
      },
      data: {
        read: true,
        readAt: new Date(),
      },
    });

    return {
      success: true,
      count: result.count,
    };
  }
}
