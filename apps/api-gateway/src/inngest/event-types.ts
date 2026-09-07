export const INNGEST_EVENTS = {
  userCreated: 'ecommerce/user.created',
  orderCreated: 'ecommerce/order.created',
  paymentStatusChanged: 'ecommerce/payment.status.changed',
  productLowStock: 'ecommerce/product.low_stock',
} as const;

export type UserCreatedEvent = {
  id: string;
  name: typeof INNGEST_EVENTS.userCreated;
  data: { userId: string; email: string; displayName: string; occurredAt: string };
};

export type OrderCreatedEvent = {
  id: string;
  name: typeof INNGEST_EVENTS.orderCreated;
  data: {
    orderId: string;
    userId: string;
    email: string;
    totalAmountMinor: number;
    currency: string;
    occurredAt: string;
  };
};

export type PaymentStatusChangedEvent = {
  id: string;
  name: typeof INNGEST_EVENTS.paymentStatusChanged;
  data: {
    paymentId: string;
    orderId: string;
    userId?: string;
    email?: string;
    status: string;
    providerEventId: string;
    occurredAt: string;
  };
};

export type ProductLowStockEvent = {
  id: string;
  name: typeof INNGEST_EVENTS.productLowStock;
  data: {
    productId: string;
    productName: string;
    stockQuantity: number;
    threshold: number;
    occurredAt: string;
  };
};

export type EcommerceEvent =
  | UserCreatedEvent
  | OrderCreatedEvent
  | PaymentStatusChangedEvent
  | ProductLowStockEvent;
