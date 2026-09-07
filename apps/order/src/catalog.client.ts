import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { CatalogServiceClient } from '@app/contracts/generated/catalog';
@Injectable()
export class CatalogClient implements OnModuleInit {
  private service!: CatalogServiceClient;
  constructor(@Inject('CATALOG_GRPC') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.service =
      this.client.getService<CatalogServiceClient>('CatalogService');
  }
  getProduct(id: string) {
    return firstValueFrom(this.service.getProduct({ productId: id }));
  }
  reserveStock(id: string, lines: { productId: string; quantity: number }[]) {
    return firstValueFrom(
      this.service.reserveStock({ reservationId: id, lines }),
    );
  }
  releaseStock(id: string) {
    return firstValueFrom(this.service.releaseStock({ reservationId: id }));
  }
}
