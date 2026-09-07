import { Controller } from '@nestjs/common';
import { OrderServiceControllerMethods } from '@app/contracts/generated/order';
import { OrderService } from './order.service';
import { Metadata } from '@grpc/grpc-js';
@Controller()
@OrderServiceControllerMethods()
export class OrderController {
  constructor(private readonly service: OrderService) {}
  private userId(metadata?: Metadata) {
    return String(metadata?.get('x-user-id')?.[0] ?? '');
  }
  createOrder(r: any, metadata?: Metadata) {
    return this.service.createOrder(r, this.userId(metadata));
  }
  getOrder(r: any, metadata?: Metadata) {
    return this.service.getOrder(r, this.userId(metadata));
  }
  listMyOrders(r: any, metadata?: Metadata) {
    return this.service.listMyOrders(r, this.userId(metadata));
  }
  cancelOrder(r: any, metadata?: Metadata) {
    return this.service.cancelOrder(r, this.userId(metadata));
  }
  markPaymentStatus(r: any) {
    return this.service.markPaymentStatus(r);
  }
  getOrderMetrics(r: any, metadata?: Metadata) {
    return this.service.getOrderMetrics(
      r,
      this.userId(metadata),
      String(metadata?.get('x-user-role')?.[0] ?? ''),
    );
  }
  listAdminOrders(r: any, metadata?: Metadata) {
    return this.service.listAdminOrders(
      r,
      this.userId(metadata),
      String(metadata?.get('x-user-role')?.[0] ?? ''),
    );
  }
}
