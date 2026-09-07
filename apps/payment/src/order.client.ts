import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { OrderServiceClient } from '@app/contracts/generated/order';
import type { Metadata } from '@grpc/grpc-js';
@Injectable()
export class OrderClient implements OnModuleInit {
  private service!: OrderServiceClient;
  constructor(@Inject('ORDER_GRPC') private readonly client: ClientGrpc) {}
  onModuleInit() { this.service = this.client.getService<OrderServiceClient>('OrderService'); }
  getOrder(id: string, metadata?: Metadata) { return firstValueFrom((this.service.getOrder as any)({ orderId: id }, metadata)); }
  markPaymentStatus(input: Parameters<OrderServiceClient['markPaymentStatus']>[0]) { return firstValueFrom(this.service.markPaymentStatus(input)); }
}
