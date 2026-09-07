import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma, PaymentStatus } from '../generated/prisma/client';
import Stripe from 'stripe';
import type {
  PaymentServiceController,
  CreateCheckoutSessionRequest,
  GetPaymentRequest,
  ProcessWebhookRequest,
  CheckoutSession as ProtoCheckout,
  Payment as ProtoPayment,
  ProcessWebhookResponse,
  GetPaymentMetricsRequest,
  PaymentMetrics,
} from '@app/contracts/generated/payment';
import { PrismaService } from './prisma.service';
import { Metadata } from '@grpc/grpc-js';

interface OrderReader {
  getOrder(id: string, metadata?: Metadata): Promise<any>;
  markPaymentStatus(input: any): Promise<any>;
}

@Injectable()
export class PaymentService implements PaymentServiceController {
  private readonly stripe: Stripe;

  constructor(
    private readonly prisma: PrismaService,
    @Inject('ORDER_READER') private readonly orders: OrderReader,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
  }

  private fail(code: string, message: string): never {
    throw new RpcException({ code, message });
  }

  private map(p: Prisma.PaymentGetPayload<object>): ProtoPayment {
    return {
      id: p.id,
      orderId: p.orderId,
      userId: p.userId,
      amount: { amountMinor: Number(p.amountMinor), currency: p.currency },
      status: p.status,
      provider: p.provider,
      providerPaymentId: p.providerPaymentId ?? '',
      createdAt: p.createdAt.toISOString(),
    };
  }

  async createCheckoutSession(
    request: CreateCheckoutSessionRequest,
    userId = '',
  ): Promise<ProtoCheckout> {
    if (!process.env.STRIPE_SECRET_KEY) this.fail('FAILED_PRECONDITION', 'STRIPE_SECRET_KEY is required');
    if (!userId) this.fail('UNAUTHENTICATED', 'Actor metadata is required');
    if (!request.orderId) this.fail('INVALID_ARGUMENT', 'order_id is required');
    if (!request.successUrl || !request.cancelUrl) this.fail('INVALID_ARGUMENT', 'success_url and cancel_url are required');

    const order = await this.orders.getOrder(request.orderId, this.metadata(userId));
    if (order.userId !== userId) this.fail('PERMISSION_DENIED', 'Order does not belong to actor');
    const existing = await this.prisma.payment.findUnique({ where: { orderId: request.orderId } });
    if (existing?.providerSessionId) {
      const session = await this.stripe.checkout.sessions.retrieve(existing.providerSessionId);
      return {
        paymentId: existing.id,
        orderId: existing.orderId,
        checkoutUrl: session.url || '',
        providerSessionId: existing.providerSessionId,
        status: existing.status,
      };
    }

    const amount = BigInt(order.total?.amountMinor || 0);
    if (amount <= 0n) this.fail('FAILED_PRECONDITION', 'Order total must be positive');
    const currency = String(order.total?.currency || process.env.STRIPE_CURRENCY || 'usd').toLowerCase();
    if (!/^[a-z]{3}$/.test(currency)) this.fail('INVALID_ARGUMENT', 'Invalid payment currency');
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency,
          product_data: { name: `Order ${request.orderId}` },
          unit_amount: Number(amount),
        },
        quantity: 1,
      }],
      success_url: request.successUrl,
      cancel_url: request.cancelUrl,
      client_reference_id: request.orderId,
      metadata: { orderId: request.orderId, userId },
    });
    const payment = await this.prisma.payment.upsert({
      where: { orderId: request.orderId },
      create: { orderId: request.orderId, userId, amountMinor: amount, currency, providerSessionId: session.id, status: PaymentStatus.CREATED },
      update: { providerSessionId: session.id, userId, amountMinor: amount, currency },
    });
    return { paymentId: payment.id, orderId: payment.orderId, checkoutUrl: session.url || '', providerSessionId: session.id, status: payment.status };
  }

  async getPayment(request: GetPaymentRequest, userId = '', role = ''): Promise<ProtoPayment> {
    if (!userId) this.fail('UNAUTHENTICATED', 'Actor metadata is required');
    const payment = await this.prisma.payment.findFirst({
      where: {
        OR: [
          { id: request.paymentId },
          { orderId: request.paymentId },
        ],
      },
    });
    if (!payment) this.fail('NOT_FOUND', 'Payment not found');
    if (role !== 'admin' && payment.userId !== userId) this.fail('PERMISSION_DENIED', 'Payment does not belong to actor');
    return this.map(payment);
  }

  async processWebhook(request: ProcessWebhookRequest): Promise<ProcessWebhookResponse> {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) this.fail('FAILED_PRECONDITION', 'STRIPE_WEBHOOK_SECRET is required');
    if (!request.rawBody?.length || !request.stripeSignature) this.fail('INVALID_ARGUMENT', 'Webhook body and stripe-signature are required');
    let event: Stripe.Event;
    try {
      event = this.stripe.webhooks.constructEvent(Buffer.from(request.rawBody), request.stripeSignature, secret);
    } catch {
      this.fail('INVALID_ARGUMENT', 'Invalid Stripe signature');
    }
    const existingEvent = await this.prisma.payment.findFirst({ where: { processedEventId: event.id } });
    if (existingEvent) return { orderId: existingEvent.orderId, paymentId: existingEvent.id, paymentStatus: existingEvent.status, providerEventId: event.id };
    if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded', 'checkout.session.async_payment_failed'].includes(event.type)) {
      return { orderId: '', paymentId: '', paymentStatus: 'IGNORED', providerEventId: event.id };
    }
    const object = event.data.object as Stripe.Checkout.Session;
    const orderId = object.metadata?.orderId || object.client_reference_id || '';
    if (!orderId) this.fail('INVALID_ARGUMENT', 'Webhook has no order id');
    const payment = await this.prisma.payment.findUnique({ where: { orderId } });
    if (!payment) this.fail('NOT_FOUND', 'Payment for webhook order not found');
    const status = event.type === 'checkout.session.async_payment_failed' ? PaymentStatus.FAILED : PaymentStatus.PAID;
    if (payment.status === PaymentStatus.PAID && status === PaymentStatus.FAILED) {
      return { orderId, paymentId: payment.id, paymentStatus: payment.status, providerEventId: event.id };
    }
    const updated = await this.prisma.payment.update({
      where: { orderId },
      data: { status, processedEventId: event.id, providerPaymentId: typeof object.payment_intent === 'string' ? object.payment_intent : undefined },
    });
    await this.orders.markPaymentStatus({ orderId, paymentId: updated.id, paymentStatus: status, providerEventId: event.id });
    return { orderId, paymentId: updated.id, paymentStatus: status, providerEventId: event.id };
  }

  async getPaymentMetrics(request: GetPaymentMetricsRequest, role = ''): Promise<PaymentMetrics> {
    if (role !== 'admin') this.fail('PERMISSION_DENIED', 'Admin role required');
    const from = request.fromAt ? new Date(request.fromAt) : undefined;
    const to = request.toAt ? new Date(request.toAt) : undefined;
    if ((from && Number.isNaN(from.getTime())) || (to && Number.isNaN(to.getTime()))) this.fail('INVALID_ARGUMENT', 'Invalid date range');
    const where = from || to ? { createdAt: { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) } } : {};
    const [total, paid, failed, pending, first] = await Promise.all([
      this.prisma.payment.count({ where }),
      this.prisma.payment.count({ where: { ...where, status: PaymentStatus.PAID } }),
      this.prisma.payment.count({ where: { ...where, status: PaymentStatus.FAILED } }),
      this.prisma.payment.count({ where: { ...where, status: { in: [PaymentStatus.CREATED, PaymentStatus.PROCESSING] } } }),
      this.prisma.payment.findFirst({ where, select: { currency: true } }),
    ]);
    return { totalCount: total, paidCount: paid, failedCount: failed, pendingCount: pending, currency: first?.currency ?? 'VND' };
  }

  private metadata(userId: string): Metadata {
    const metadata = new Metadata();
    metadata.set('x-user-id', userId);
    return metadata;
  }
}
