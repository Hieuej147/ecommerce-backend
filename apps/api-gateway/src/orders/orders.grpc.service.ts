import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type {
  OrderServiceClient,
  ListMyOrdersResponse,
  ListAdminOrdersResponse,
} from '@app/contracts/generated/order';
import type { Metadata } from '@grpc/grpc-js';
@Injectable()
export class OrdersGrpcService implements OnModuleInit {
  private service!: OrderServiceClient;
  constructor(@Inject('ORDER_GRPC') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.service = this.client.getService<OrderServiceClient>('OrderService');
  }
  create(
    input: Parameters<OrderServiceClient['createOrder']>[0],
    metadata?: Metadata,
  ) {
    return firstValueFrom((this.service.createOrder as any)(input, metadata));
  }
  get(id: string, metadata?: Metadata) {
    return firstValueFrom(
      (this.service.getOrder as any)({ orderId: id, order_id: id }, metadata),
    );
  }
  list(metadata?: Metadata): Promise<ListMyOrdersResponse> {
    return firstValueFrom(
      (this.service.listMyOrders as any)(
        { page: { pageSize: 50, pageToken: '' } },
        metadata,
      ),
    );
  }
  cancel(id: string, metadata?: Metadata) {
    return firstValueFrom(
      (this.service.cancelOrder as any)(
        { orderId: id, order_id: id },
        metadata,
      ),
    );
  }

  metrics(input: { fromAt?: string; toAt?: string }, metadata?: Metadata) {
    return firstValueFrom(
      (this.service.getOrderMetrics as any)(
        { fromAt: input.fromAt ?? '', toAt: input.toAt ?? '' },
        metadata,
      ),
    );
  }
  adminList(
    input: {
      pageSize?: number;
      pageToken?: string;
      status?: string;
      paymentStatus?: string;
      search?: string;
      fromAt?: string;
      toAt?: string;
    },
    metadata?: Metadata,
  ): Promise<ListAdminOrdersResponse> {
    return firstValueFrom(
      (this.service.listAdminOrders as any)(
        {
          page: {
            pageSize: input.pageSize ?? 50,
            pageToken: input.pageToken ?? '',
          },
          status: input.status ?? '',
          paymentStatus: input.paymentStatus ?? '',
          search: input.search ?? '',
          fromAt: input.fromAt ?? '',
          toAt: input.toAt ?? '',
        },
        metadata,
      ),
    );
  }
}
