import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { CatalogServiceClient } from '@app/contracts/generated/catalog';
import type { Metadata } from '@grpc/grpc-js';

@Injectable()
export class CatalogGrpcService implements OnModuleInit {
  private catalog!: CatalogServiceClient;

  constructor(@Inject('CATALOG_GRPC') private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.catalog =
      this.client.getService<CatalogServiceClient>('CatalogService');
  }

  getProduct(id: string) {
    return firstValueFrom(this.catalog.getProduct({ productId: id }));
  }
  listProducts(query: {
    pageSize?: number;
    pageToken?: string;
    search?: string;
    status?: string;
  }) {
    return firstValueFrom(
      this.catalog.listProducts({
        page: {
          pageSize: query.pageSize ?? 20,
          pageToken: query.pageToken ?? '',
        },
        search: query.search ?? '',
        status: query.status ?? '',
      }),
    );
  }
  createProduct(
    input: Parameters<CatalogServiceClient['createProduct']>[0],
    metadata?: Metadata,
  ) {
    return firstValueFrom((this.catalog.createProduct as any)(input, metadata));
  }
  updateProduct(
    input: Parameters<CatalogServiceClient['updateProduct']>[0],
    metadata?: Metadata,
  ) {
    return firstValueFrom((this.catalog.updateProduct as any)(input, metadata));
  }
  archiveProduct(id: string, metadata?: Metadata) {
    return firstValueFrom(
      (this.catalog.archiveProduct as any)({ productId: id }, metadata),
    );
  }
  inventoryMetrics(metadata?: Metadata) {
    return firstValueFrom((this.catalog.getInventoryMetrics as any)({}, metadata));
  }
}
