import { inngest, InngestEventsService } from './inngest.client';

describe('InngestEventsService', () => {
  const send = jest.spyOn(inngest, 'send').mockResolvedValue({ ids: ['event_1'] });

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = 'development';
    process.env.INNGEST_EVENT_KEY = 'test-event-key';
  });

  afterAll(() => {
    delete process.env.INNGEST_EVENT_KEY;
  });

  it('publishes a deterministic order event id', async () => {
    await new InngestEventsService().orderCreated({ orderId: 'order_1', userId: 'user_1' });
    expect(send).toHaveBeenCalledWith(expect.objectContaining({
      id: 'order.created:order_1',
      name: 'ecommerce/order.created',
    }));
  });

  it('does not publish when Jest has no event key', async () => {
    delete process.env.INNGEST_EVENT_KEY;
    process.env.NODE_ENV = 'test';
    await new InngestEventsService().paymentStatusChanged({ paymentId: 'payment_1' });
    expect(send).not.toHaveBeenCalled();
  });
});
