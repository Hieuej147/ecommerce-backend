import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Inngest } from 'inngest';
import { EmailService } from './email.service';
import { INNGEST_EVENTS } from './event-types';
import { getPrismaClient } from '../prisma/prisma.service';
import type { NotificationType } from '@prisma/client';

export const inngest = new Inngest({ id: 'microservice-ecommerce' });

const now = () => new Date().toISOString();

async function createNotificationSafely(data: {
  userId?: string | null;
  targetRole?: string | null;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  href?: string | null;
  dedupeKey?: string;
}) {
  try {
    const prisma = getPrismaClient();
    if (data.dedupeKey) {
      return await prisma.notification.upsert({
        where: { dedupeKey: data.dedupeKey },
        update: {},
        create: {
          userId: data.userId || null,
          targetRole: data.targetRole || null,
          type: data.type,
          title: data.title,
          message: data.message,
          data: (data.data as any) ?? undefined,
          href: data.href || null,
          dedupeKey: data.dedupeKey,
        },
      });
    }
    return await prisma.notification.create({
      data: {
        userId: data.userId || null,
        targetRole: data.targetRole || null,
        type: data.type,
        title: data.title,
        message: data.message,
        data: (data.data as any) ?? undefined,
        href: data.href || null,
      },
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
    return null;
  }
}

export const welcomeUserFunction = inngest.createFunction(
  { id: 'welcome-user-email', retries: 3, triggers: { event: INNGEST_EVENTS.userCreated } },
  async ({ event, step }) => {
    const userId = String(event.data.userId || '');
    if (userId) {
      await step.run('persist-welcome-notification', async () => {
        return createNotificationSafely({
          userId,
          targetRole: 'CUSTOMER',
          type: 'NEW_CUSTOMER',
          title: 'Chào mừng bạn đến với cửa hàng!',
          message: `Chào mừng ${String(event.data.displayName || 'bạn')}. Tài khoản của bạn đã sẵn sàng trải nghiệm mua sắm.`,
          href: '/',
          dedupeKey: `user.welcome:${userId}`,
        });
      });
    }

    return step.run('send-welcome-email', async () => {
      const email = String(event.data.email || '');
      if (!email) return { skipped: true, reason: 'missing-email' };
      return new EmailService().send({
        to: email,
        subject: 'Welcome to E-commerce',
        text: `Welcome ${String(event.data.displayName || 'there')}. Your account is ready.`,
      });
    });
  },
);

export const orderCreatedFunction = inngest.createFunction(
  { id: 'order-created-email', retries: 3, triggers: { event: INNGEST_EVENTS.orderCreated } },
  async ({ event, step }) => {
    const orderId = String(event.data.orderId || '');
    const userId = String(event.data.userId || '');

    if (userId && orderId) {
      await step.run('persist-order-customer-notification', async () => {
        return createNotificationSafely({
          userId,
          targetRole: 'CUSTOMER',
          type: 'ORDER_CREATED',
          title: 'Đơn hàng đã được tiếp nhận',
          message: `Đơn hàng #${orderId} của bạn đã được ghi nhận vào hệ thống.`,
          href: '/orders',
          data: { orderId, totalAmountMinor: event.data.totalAmountMinor, currency: event.data.currency },
          dedupeKey: `order.created.customer:${orderId}`,
        });
      });
    }

    if (orderId) {
      await step.run('persist-order-admin-notification', async () => {
        return createNotificationSafely({
          userId: null,
          targetRole: 'ADMIN',
          type: 'ORDER_CREATED',
          title: 'Đơn hàng mới',
          message: `Đơn hàng #${orderId} vừa được tạo bởi ${String(event.data.customerName || event.data.customerEmail || 'khách hàng')}.`,
          href: '/orders',
          data: { orderId, totalAmountMinor: event.data.totalAmountMinor, currency: event.data.currency, userId },
          dedupeKey: `order.created.admin:${orderId}`,
        });
      });
    }

    return step.run('send-order-created-email', async () => {
      const email = String(event.data.email || '');
      if (!email) return { skipped: true, reason: 'missing-email' };
      return new EmailService().send({
        to: email,
        subject: `Order ${orderId} created`,
        text: `Your order ${orderId} was created. Total: ${String(event.data.totalAmountMinor)} ${String(event.data.currency)}.`,
      });
    });
  },
);

export const paymentStatusFunction = inngest.createFunction(
  { id: 'payment-status-email', retries: 3, triggers: { event: INNGEST_EVENTS.paymentStatusChanged } },
  async ({ event, step }) => {
    const orderId = String(event.data.orderId || '');
    let userId = String(event.data.userId || '');
    const rawStatus = event.data.status || event.data.paymentStatus || '';
    let status = String(rawStatus).toUpperCase();
    let email = String(event.data.email || '');

    if (orderId) {
      const prisma = getPrismaClient();
      try {
        const dbOrder = await prisma.order.findUnique({
          where: { id: orderId },
          select: { userId: true, paymentStatus: true, status: true, customerEmail: true },
        });
        if (dbOrder) {
          if (!userId && dbOrder.userId) userId = dbOrder.userId;
          if (!status) status = String(dbOrder.paymentStatus || dbOrder.status || '').toUpperCase();
          if (!email && dbOrder.customerEmail) email = dbOrder.customerEmail;
        }
      } catch (err) {
        console.error('Failed to lookup order in paymentStatusFunction:', err);
      }
    }

    const isSuccess = status === 'PAID';
    const isFailed = status === 'FAILED' || status === 'PAYMENT_FAILED';

    if (orderId && (isSuccess || isFailed)) {
      const type: NotificationType = isSuccess ? 'PAYMENT_SUCCESS' : 'PAYMENT_FAILED';
      const dedupePrefix = isSuccess ? 'payment.success' : 'payment.failed';

      if (userId) {
        await step.run('persist-payment-customer-notification', async () => {
          return createNotificationSafely({
            userId,
            targetRole: 'CUSTOMER',
            type,
            title: isSuccess ? 'Thanh toán thành công' : 'Thanh toán không thành công',
            message: isSuccess
              ? `Xác nhận thanh toán thành công cho đơn hàng #${orderId}.`
              : `Thanh toán cho đơn hàng #${orderId} không thành công. Vui lòng kiểm tra lại.`,
            href: '/orders',
            data: { orderId, status },
            dedupeKey: `${dedupePrefix}.customer:${orderId}`,
          });
        });
      }

      await step.run('persist-payment-admin-notification', async () => {
        return createNotificationSafely({
          userId: null,
          targetRole: 'ADMIN',
          type,
          title: isSuccess ? 'Xác nhận thanh toán' : 'Cảnh báo thanh toán thất bại',
          message: isSuccess
            ? `Đơn hàng #${orderId} đã được khách hàng thanh toán thành công.`
            : `Đơn hàng #${orderId} thanh toán không thành công.`,
          href: '/orders',
          data: { orderId, status, userId },
          dedupeKey: `${dedupePrefix}.admin:${orderId}`,
        });
      });
    }

    if (isSuccess || isFailed) {
      return step.run('send-payment-status-email', async () => {
        if (!email) return { skipped: true, reason: 'missing-email' };
        return new EmailService().send({
          to: email,
          subject: `Payment ${status}`,
          text: `Payment for order ${orderId} is ${status}.`,
        });
      });
    }

    return { skipped: true, reason: `Ignored status: ${status}` };
  },
);


export const lowStockFunction = inngest.createFunction(
  { id: 'low-stock-admin-alert', retries: 3, triggers: { event: INNGEST_EVENTS.productLowStock } },
  async ({ event, step }) => {
    const productId = String(event.data.productId || '');
    const productName = String(event.data.productName || 'Sản phẩm');
    const stockQuantity = Number(event.data.stockQuantity ?? 0);
    const threshold = Number(event.data.threshold ?? 10);

    if (productId) {
      await step.run('persist-low-stock-admin-notification', async () => {
        return createNotificationSafely({
          userId: null,
          targetRole: 'ADMIN',
          type: 'PRODUCT_LOW_STOCK',
          title: 'Cảnh báo tồn kho thấp',
          message: `Sản phẩm "${productName}" (Mã: ${productId}) chỉ còn ${stockQuantity} sản phẩm trong kho (ngưỡng: ${threshold}).`,
          href: '/products',
          data: { productId, productName, stockQuantity, threshold },
          dedupeKey: `product.low_stock:${productId}:${stockQuantity}`,
        });
      });
    }

    return step.run('send-low-stock-admin-alert', async () => {
      const to = process.env.ADMIN_ALERT_EMAIL;
      if (!to) return { skipped: true, reason: 'ADMIN_ALERT_EMAIL is not configured' };
      return new EmailService().send({
        to,
        subject: `Low stock: ${productName}`,
        text: `Product ${productName} (${productId}) has ${stockQuantity} units left; threshold is ${threshold}.`,
      });
    });
  },
);

@Injectable()
export class InngestEventsService implements OnModuleDestroy {
  private async send(event: { id: string; name: string; data: Record<string, unknown> }) {
    if (!process.env.INNGEST_EVENT_KEY && process.env.NODE_ENV === 'test') return;
    try {
      await inngest.send(event);
    } catch {
      // The business transaction has already committed. Inngest retries the
      // request at the endpoint; observability/outbox is a scale-phase task.
    }
  }

  orderCreated(data: Record<string, unknown>) {
    const orderId = String(data.orderId || '');
    return this.send({ id: `order.created:${orderId}`, name: INNGEST_EVENTS.orderCreated, data: { ...data, occurredAt: now() } });
  }

  paymentStatusChanged(data: Record<string, unknown>) {
    const eventId = String(data.providerEventId || data.paymentId || '');
    return this.send({ id: `payment.status.changed:${eventId}`, name: INNGEST_EVENTS.paymentStatusChanged, data: { ...data, occurredAt: now() } });
  }

  userCreated(data: Record<string, unknown>) {
    const userId = String(data.userId || '');
    return this.send({ id: `user.created:${userId}`, name: INNGEST_EVENTS.userCreated, data: { ...data, occurredAt: now() } });
  }

  productLowStock(data: Record<string, unknown>) {
    const productId = String(data.productId || '');
    return this.send({ id: `product.low_stock:${productId}:${String(data.stockQuantity || '')}`, name: INNGEST_EVENTS.productLowStock, data: { ...data, occurredAt: now() } });
  }

  async onModuleDestroy() { return undefined; }
}
