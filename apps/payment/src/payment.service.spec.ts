import Stripe from 'stripe';
import { PaymentService } from './payment.service';
import { PaymentStatus } from '../generated/prisma/client';

describe('PaymentService', () => {
  const prisma = {
    payment: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      upsert: jest.fn(),
      update: jest.fn(),
    },
  } as any;
  const orders = { getOrder: jest.fn(), markPaymentStatus: jest.fn() };
  let service: PaymentService;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.STRIPE_SECRET_KEY = 'sk_test_unit';
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_unit';
    service = new PaymentService(prisma, orders);
  });

  it('creates a Checkout Session from the Order total', async () => {
    orders.getOrder.mockResolvedValue({
      userId: 'user_1',
      total: { amountMinor: 2500, currency: 'USD' },
    });
    (service as any).stripe.checkout.sessions.create = jest.fn().mockResolvedValue({ id: 'cs_1', url: 'https://checkout.test/cs_1' });
    prisma.payment.upsert.mockResolvedValue({ id: 'pay_1', orderId: 'order_1', status: PaymentStatus.CREATED });

    const result = await service.createCheckoutSession({ orderId: 'order_1', successUrl: 'https://app/success', cancelUrl: 'https://app/cancel', idempotencyKey: 'k1' }, 'user_1');

    expect((service as any).stripe.checkout.sessions.create).toHaveBeenCalled();
    expect(result).toMatchObject({ paymentId: 'pay_1', checkoutUrl: 'https://checkout.test/cs_1' });
    expect(orders.getOrder).toHaveBeenCalledWith('order_1', expect.anything());
  });

  it('returns the existing Checkout Session on retry', async () => {
    orders.getOrder.mockResolvedValue({ userId: 'user_1', total: { amountMinor: 2500, currency: 'USD' } });
    prisma.payment.findUnique.mockResolvedValue({ id: 'pay_1', orderId: 'order_1', userId: 'user_1', providerSessionId: 'cs_1', status: PaymentStatus.CREATED });
    const createSession = jest.spyOn((service as any).stripe.checkout.sessions, 'create');
    (service as any).stripe.checkout.sessions.retrieve = jest.fn().mockResolvedValue({ id: 'cs_1', url: 'https://checkout.test/cs_1' });

    const result = await service.createCheckoutSession({ orderId: 'order_1', successUrl: 'https://app/success', cancelUrl: 'https://app/cancel', idempotencyKey: 'k1' }, 'user_1');

    expect(result.checkoutUrl).toBe('https://checkout.test/cs_1');
    expect(createSession).not.toHaveBeenCalled();
  });

  it('rejects payment reads from another user', async () => {
    const payment = { id: 'pay_1', userId: 'owner', amountMinor: 100, currency: 'USD', status: PaymentStatus.CREATED, provider: 'stripe', providerPaymentId: null, orderId: 'order_1', createdAt: new Date() };
    prisma.payment.findUnique.mockResolvedValue(payment);
    prisma.payment.findFirst.mockResolvedValue(payment);
    await expect(service.getPayment({ paymentId: 'pay_1' }, 'attacker')).rejects.toMatchObject({ error: { code: 'PERMISSION_DENIED' } });
  });

  it('verifies and applies a completed Checkout webhook', async () => {
    prisma.payment.findFirst.mockResolvedValue(null);
    prisma.payment.findUnique.mockResolvedValue({ id: 'pay_1', orderId: 'order_1', userId: 'user_1', status: PaymentStatus.CREATED });
    prisma.payment.update.mockResolvedValue({ id: 'pay_1', orderId: 'order_1', status: PaymentStatus.PAID });
    (service as any).stripe.webhooks.constructEvent = jest.fn().mockReturnValue({ id: 'evt_1', type: 'checkout.session.completed', data: { object: { metadata: { orderId: 'order_1' }, payment_intent: 'pi_1' } } } as Stripe.Event);

    const result = await service.processWebhook({ rawBody: new Uint8Array([1, 2]), stripeSignature: 't=1,v1=test' });

    expect(result.paymentStatus).toBe(PaymentStatus.PAID);
    expect(orders.markPaymentStatus).toHaveBeenCalledWith(expect.objectContaining({ orderId: 'order_1', paymentStatus: PaymentStatus.PAID }));
  });

  it('does not process the same webhook event twice', async () => {
    prisma.payment.findFirst.mockResolvedValue({ id: 'pay_1', orderId: 'order_1', status: PaymentStatus.PAID });
    (service as any).stripe.webhooks.constructEvent = jest.fn().mockReturnValue({ id: 'evt_1', type: 'checkout.session.completed', data: { object: {} } } as Stripe.Event);

    const result = await service.processWebhook({ rawBody: new Uint8Array([1]), stripeSignature: 't=1,v1=test' });

    expect(result.paymentStatus).toBe(PaymentStatus.PAID);
    expect(prisma.payment.update).not.toHaveBeenCalled();
    expect(orders.markPaymentStatus).not.toHaveBeenCalled();
  });
});
