import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  Prisma,
  OrderStatus,
  OrderPaymentStatus,
} from '../generated/prisma/client';
import type {
  OrderServiceController,
  CreateOrderRequest,
  GetOrderRequest,
  ListMyOrdersRequest,
  CancelOrderRequest,
  MarkPaymentStatusRequest,
  GetOrderMetricsRequest,
  OrderMetrics,
  Order as ProtoOrder,
  ListAdminOrdersRequest,
  ListAdminOrdersResponse,
} from '@app/contracts/generated/order';
import type { Money, Empty } from '@app/contracts/generated/common';
import { PrismaService } from './prisma.service';

export interface CatalogReader {
  getProduct(id: string): Promise<any>;
  reserveStock(
    id: string,
    lines: { productId: string; quantity: number }[],
  ): Promise<any>;
  releaseStock(id: string): Promise<any>;
}

@Injectable()
export class OrderService implements OrderServiceController {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CATALOG_READER') private readonly catalog: CatalogReader,
  ) {}
  private fail(code: string, message: string): never {
    throw new RpcException({ code, message });
  }
  private money(amount: bigint | number, currency: string): Money {
    return { amountMinor: Number(amount), currency };
  }
  private map(
    order: Prisma.OrderGetPayload<{ include: { items: true } }>,
  ): ProtoOrder {
    const currency = order.currency;
    return {
      id: order.id,
      userId: order.userId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      status: order.status,
      paymentStatus: order.paymentStatus,
      subtotal: this.money(order.subtotalAmountMinor, currency),
      total: this.money(order.totalAmountMinor, currency),
      shippingAddress: {
        recipientName: order.recipientName,
        phone: order.phone,
        line1: order.line1,
        line2: order.line2,
        city: order.city,
        province: order.province,
        postalCode: order.postalCode,
        countryCode: order.countryCode,
      },
      items: order.items.map((i) => ({
        productId: i.productId,
        productName: i.productName,
        quantity: i.quantity,
        unitPrice: this.money(i.unitPriceAmountMinor, currency),
        lineTotal: this.money(i.lineTotalAmountMinor, currency),
      })),
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    };
  }
  async createOrder(
    request: CreateOrderRequest,
    userId = '',
  ): Promise<ProtoOrder> {
    if (!userId) this.fail('UNAUTHENTICATED', 'Actor metadata is required');
    if (!request.items.length || request.items.some((i) => i.quantity <= 0))
      this.fail('INVALID_ARGUMENT', 'Order items are invalid');
    if (!request.idempotencyKey)
      this.fail('INVALID_ARGUMENT', 'idempotency_key is required');
    const existing = await this.prisma.order.findFirst({
      where: { userId, idempotencyKey: request.idempotencyKey },
      include: { items: true },
    });
    if (existing) return this.map(existing);
    const products = await Promise.all(
      request.items.map((i) => this.catalog.getProduct(i.productId)),
    );
    const currency = products[0]?.price?.currency || 'USD';
    if (products.some((p) => !p || p.price?.currency !== currency))
      this.fail(
        'FAILED_PRECONDITION',
        'Products are unavailable or currencies differ',
      );
    const lines = request.items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));
    const reservationId = `order:${userId}:${request.idempotencyKey}`;
    await this.catalog.reserveStock(reservationId, lines);
    try {
      const items = request.items.map((item, n) => {
        const amount = BigInt(products[n].price.amountMinor);
        return {
          productId: item.productId,
          productName: products[n].name,
          quantity: item.quantity,
          unitPriceAmountMinor: amount,
          lineTotalAmountMinor: amount * BigInt(item.quantity),
        };
      });
      const total = items.reduce(
        (sum, item) => sum + item.lineTotalAmountMinor,
        0n,
      );
      const address = request.shippingAddress;
      const order = await this.prisma.order.create({
        data: {
          userId,
          customerName: address?.recipientName || '',
          idempotencyKey: request.idempotencyKey,
          subtotalAmountMinor: total,
          totalAmountMinor: total,
          currency,
          recipientName: address?.recipientName || '',
          phone: address?.phone || '',
          line1: address?.line1 || '',
          line2: address?.line2 || '',
          city: address?.city || '',
          province: address?.province || '',
          postalCode: address?.postalCode || '',
          countryCode: address?.countryCode || '',
          items: { create: items },
        },
        include: { items: true },
      });
      return this.map(order);
    } catch (error) {
      await this.catalog.releaseStock(reservationId);
      throw error;
    }
  }
  async getOrder(request: GetOrderRequest, userId = ''): Promise<ProtoOrder> {
    const orderId = request.orderId || (request as any).order_id;
    const o = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });
    if (!o) this.fail('NOT_FOUND', 'Order not found');
    if (userId && o.userId !== userId)
      this.fail('PERMISSION_DENIED', 'Order does not belong to actor');
    return this.map(o);
  }

  async listMyOrders(_request: ListMyOrdersRequest, userId = '') {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { items: true },
    });
    return {
      orders: orders.map((o) => this.map(o)),
      pageInfo: { hasNextPage: false, nextPageToken: '' },
    };
  }
  async cancelOrder(
    request: CancelOrderRequest,
    userId = '',
  ): Promise<ProtoOrder> {
    const o = await this.prisma.order.findUnique({
      where: { id: request.orderId },
      include: { items: true },
    });
    if (!o) this.fail('NOT_FOUND', 'Order not found');
    if (userId && o.userId !== userId)
      this.fail('PERMISSION_DENIED', 'Order does not belong to actor');
    if (o.status !== OrderStatus.PENDING_PAYMENT)
      this.fail('FAILED_PRECONDITION', 'Only pending orders can be cancelled');
    await this.catalog.releaseStock(`order:${o.userId}:${o.idempotencyKey}`);
    const updated = await this.prisma.order.update({
      where: { id: o.id },
      data: { status: OrderStatus.CANCELLED },
      include: { items: true },
    });
    return this.map(updated);
  }
  async markPaymentStatus(
    request: MarkPaymentStatusRequest,
  ): Promise<ProtoOrder> {
    const o = await this.prisma.order.findUnique({
      where: { id: request.orderId },
      include: { items: true },
    });
    if (!o) this.fail('NOT_FOUND', 'Order not found');
    const normalized = request.paymentStatus.toUpperCase();
    if (
      normalized !== OrderPaymentStatus.PAID &&
      normalized !== OrderPaymentStatus.FAILED
    )
      this.fail('INVALID_ARGUMENT', 'Unsupported payment status');
    const paymentStatus: OrderPaymentStatus = normalized;
    if (o.paymentStatus === paymentStatus) return this.map(o);
    if (
      o.paymentStatus === OrderPaymentStatus.PAID &&
      paymentStatus === OrderPaymentStatus.FAILED
    )
      this.fail('FAILED_PRECONDITION', 'A paid order cannot become failed');
    const status =
      paymentStatus === OrderPaymentStatus.PAID
        ? OrderStatus.PAID
        : OrderStatus.PAYMENT_FAILED;
    const updated = await this.prisma.order.update({
      where: { id: o.id },
      data: { paymentStatus, status },
      include: { items: true },
    });
    return this.map(updated);
  }
  async getOrderMetrics(
    request: GetOrderMetricsRequest,
    _userId = '',
    role = '',
  ): Promise<OrderMetrics> {
    if (role !== 'admin') this.fail('PERMISSION_DENIED', 'Admin role required');
    const from = request.fromAt ? new Date(request.fromAt) : undefined;
    const to = request.toAt ? new Date(request.toAt) : undefined;
    if (
      (from && Number.isNaN(from.getTime())) ||
      (to && Number.isNaN(to.getTime()))
    )
      this.fail('INVALID_ARGUMENT', 'Invalid metrics date range');
    const dateFilter =
      from || to
        ? {
            createdAt: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
            },
          }
        : {};
    const paidWhere = {
      ...dateFilter,
      OR: [
        { status: OrderStatus.PAID },
        { paymentStatus: OrderPaymentStatus.PAID },
      ],
    };
    const [count, paidCount, pendingCount, sum, currency] = await Promise.all([
      this.prisma.order.count({ where: dateFilter }),
      this.prisma.order.count({ where: paidWhere }),
      this.prisma.order.count({
        where: {
          ...dateFilter,
          status: OrderStatus.PENDING_PAYMENT,
        },
      }),
      this.prisma.order.aggregate({ where: paidWhere, _sum: { totalAmountMinor: true } }),
      this.prisma.order.findFirst({ where: paidWhere, select: { currency: true } }),
    ]);
    return {
      orderCount: count,
      paidOrderCount: paidCount,
      pendingOrderCount: pendingCount,
      revenueAmountMinor: Number(sum._sum.totalAmountMinor ?? 0n),
      currency: currency?.currency ?? 'VND',
    };
  }

  async listAdminOrders(
    request: ListAdminOrdersRequest,
    _userId = '',
    role = '',
  ): Promise<ListAdminOrdersResponse> {
    if (role !== 'admin') this.fail('PERMISSION_DENIED', 'Admin role required');
    const pageSize = Math.min(Math.max(request.page?.pageSize || 50, 1), 100);
    const cursor = request.page?.pageToken || undefined;
    const from = request.fromAt ? new Date(request.fromAt) : undefined;
    const to = request.toAt ? new Date(request.toAt) : undefined;
    if (
      (from && Number.isNaN(from.getTime())) ||
      (to && Number.isNaN(to.getTime()))
    )
      this.fail('INVALID_ARGUMENT', 'Invalid date range');
    const validStatus = Object.values(OrderStatus);
    const validPaymentStatus = Object.values(OrderPaymentStatus);
    if (request.status && !validStatus.includes(request.status as OrderStatus))
      this.fail('INVALID_ARGUMENT', 'Invalid order status');
    if (
      request.paymentStatus &&
      !validPaymentStatus.includes(request.paymentStatus as OrderPaymentStatus)
    )
      this.fail('INVALID_ARGUMENT', 'Invalid payment status');
    const search = request.search?.trim();
    const rows = await this.prisma.order.findMany({
      where: {
        ...(request.status ? { status: request.status as OrderStatus } : {}),
        ...(request.paymentStatus
          ? { paymentStatus: request.paymentStatus as OrderPaymentStatus }
          : {}),
        ...(from || to
          ? {
              createdAt: {
                ...(from ? { gte: from } : {}),
                ...(to ? { lte: to } : {}),
              },
            }
          : {}),
        ...(search
          ? {
              OR: [
                { id: { contains: search, mode: 'insensitive' } },
                { userId: { contains: search, mode: 'insensitive' } },
                { customerName: { contains: search, mode: 'insensitive' } },
                { customerEmail: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: pageSize + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      include: { items: true },
    });
    const hasNextPage = rows.length > pageSize;
    const page = rows.slice(0, pageSize);
    return {
      orders: page.map((row) => this.map(row)),
      pageInfo: {
        hasNextPage,
        nextPageToken: hasNextPage ? (page.at(-1)?.id ?? '') : '',
      },
    };
  }
}
