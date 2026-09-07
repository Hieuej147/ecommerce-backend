import { Injectable } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { CatalogGrpcService } from '../catalog/catalog.grpc.service';
import { OrdersGrpcService } from '../orders/orders.grpc.service';
import { PaymentsGrpcService } from '../payments/payments.grpc.service';
import type { ListAdminOrdersResponse, OrderMetrics } from '@app/contracts/generated/order';
import type { PaymentMetrics } from '@app/contracts/generated/payment';
import type { InventoryMetrics, ListProductsResponse } from '@app/contracts/generated/catalog';

@Injectable()
export class AdminOverviewService {
  constructor(
    private readonly catalog: CatalogGrpcService,
    private readonly orders: OrdersGrpcService,
    private readonly payments: PaymentsGrpcService,
  ) {}

  async get(metadata: Metadata) {
    const [inventory, orderMetrics, paymentMetrics, products, orders] = await Promise.all([
      this.catalog.inventoryMetrics(metadata),
      this.orders.metrics({}, metadata),
      this.payments.metrics({}, metadata),
      this.catalog.listProducts({ pageSize: 100 }),
      this.orders.adminList({ pageSize: 100 }, metadata),
    ]) as [InventoryMetrics, OrderMetrics, PaymentMetrics, ListProductsResponse, ListAdminOrdersResponse];
    const orderRows = orders.orders ?? [];
    const lowStock = (products.products ?? []).filter((product) => product.stockQuantity <= 20);
    const exceptions = orderRows.filter((order) => ['PENDING_PAYMENT', 'PAYMENT_FAILED', 'CANCELLED'].includes(order.status));
    const revenueAmount = Number(orderMetrics.revenueAmountMinor ?? 0);
    const orderCount = Number(orderMetrics.orderCount ?? 0);
    return {
      revenue: { amountMinor: revenueAmount, currency: orderMetrics.currency || 'VND' },
      orderCount,
      averageOrder: { amountMinor: orderCount ? Math.round(revenueAmount / orderCount) : 0, currency: orderMetrics.currency || 'VND' },
      paymentHealth: paymentMetrics.totalCount ? Math.round((Number(paymentMetrics.paidCount) / Number(paymentMetrics.totalCount)) * 10000) / 100 : 100,
      inventory,
      lowStock,
      exceptions,
      revenueSeries: [],
    };
  }
}
