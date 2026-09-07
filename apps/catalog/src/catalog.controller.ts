import { Controller } from '@nestjs/common';
import {
  CatalogServiceControllerMethods,
  type ArchiveProductRequest,
  type CreateProductRequest,
  type GetProductRequest,
  type GetInventoryMetricsRequest,
  type ListProductsRequest,
  type ReleaseStockRequest,
  type ReserveStockRequest,
  type UpdateProductRequest,
} from '@app/contracts/generated/catalog';
import type { Empty } from '@app/contracts/generated/common';
import { CatalogService } from './catalog.service';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@CatalogServiceControllerMethods()
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  private role(metadata?: Metadata): string {
    return String(metadata?.get('x-user-role')?.[0] ?? '');
  }

  getProduct(request: GetProductRequest) {
    return this.catalogService.getProduct(request);
  }
  listProducts(request: ListProductsRequest) {
    return this.catalogService.listProducts(request);
  }
  createProduct(request: CreateProductRequest, metadata?: Metadata) {
    return this.catalogService.createProduct(request, this.role(metadata));
  }
  updateProduct(request: UpdateProductRequest, metadata?: Metadata) {
    return this.catalogService.updateProduct(request, this.role(metadata));
  }
  archiveProduct(request: ArchiveProductRequest, metadata?: Metadata): Promise<Empty> {
    return this.catalogService.archiveProduct(request, this.role(metadata));
  }
  getInventoryMetrics(request: GetInventoryMetricsRequest, metadata?: Metadata) {
    return this.catalogService.getInventoryMetrics(request, this.role(metadata));
  }
  reserveStock(request: ReserveStockRequest) {
    return this.catalogService.reserveStock(request);
  }
  releaseStock(request: ReleaseStockRequest): Promise<Empty> {
    return this.catalogService.releaseStock(request);
  }
}
