import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Prisma, ProductStatus, ReservationStatus } from '@prisma/client';
import type { Empty, PageInfo } from '@app/contracts/generated/common';
import type {
  ArchiveProductRequest, CatalogServiceController, CreateProductRequest,
  GetProductRequest, ListProductsRequest, ListProductsResponse, Product,
  ReleaseStockRequest, ReserveStockRequest, ReserveStockResponse,
  UpdateProductRequest,
  GetInventoryMetricsRequest, InventoryMetrics,
} from '@app/contracts/generated/catalog';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class CatalogService implements CatalogServiceController {
  constructor(private readonly prisma: PrismaService) {}

  private toProto(product: Prisma.ProductGetPayload<object>): Product {
    let imagesMap: { [key: string]: string } = {};
    if (product.images && typeof product.images === 'object' && !Array.isArray(product.images)) {
      imagesMap = product.images as { [key: string]: string };
    } else if (Array.isArray(product.images)) {
      product.images.forEach((img, idx) => imagesMap[`color${idx}`] = String(img));
    }

    return {
      id: product.id, slug: product.slug, name: product.name,
      description: product.description,
      price: { amountMinor: Number(product.priceAmountMinor), currency: product.currency },
      stockQuantity: product.stockQuantity, status: product.status, sku: product.sku ?? '', categorySlug: product.categorySlug,
      reorderPoint: product.reorderPoint,
      images: imagesMap,
      colors: product.colors ?? [],
      sizes: product.sizes ?? [],
      createdAt: product.createdAt.toISOString(), updatedAt: product.updatedAt.toISOString(),
    };
  }

  private error(code: string, message: string): never { throw new RpcException({ code, message }); }
  private requireAdmin(role: string): void { if (role !== 'admin') this.error('PERMISSION_DENIED', 'Admin role required'); }

  async getProduct(request: GetProductRequest): Promise<Product> {
    const product = await this.prisma.product.findUnique({ where: { id: request.productId } });
    if (!product) this.error('NOT_FOUND', 'Product not found');
    return this.toProto(product);
  }

  async listProducts(request: ListProductsRequest): Promise<ListProductsResponse> {
    const pageSize = Math.min(Math.max(request.page?.pageSize || 20, 1), 100);
    const cursor = request.page?.pageToken || undefined;

    const statusFilter = request.status?.trim().toUpperCase();
    let whereClause: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
    };

    if (statusFilter === 'ARCHIVED') {
      whereClause = { status: ProductStatus.ARCHIVED };
    } else if (statusFilter === 'OUT_OF_STOCK') {
      whereClause = { status: ProductStatus.ACTIVE, stockQuantity: { lte: 0 } };
    } else if (statusFilter === 'LOW_STOCK') {
      whereClause = { status: ProductStatus.ACTIVE, stockQuantity: { gt: 0, lte: 10 } };
    } else if (statusFilter === 'ACTIVE') {
      whereClause = { status: ProductStatus.ACTIVE, stockQuantity: { gt: 10 } };
    }

    if (request.search) {
      whereClause.OR = [
        { name: { contains: request.search, mode: 'insensitive' } },
        { slug: { contains: request.search, mode: 'insensitive' } },
      ];
    }

    const products = await this.prisma.product.findMany({
      where: whereClause,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: pageSize + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });
    const hasNextPage = products.length > pageSize;
    const page = products.slice(0, pageSize);
    const pageInfo: PageInfo = { hasNextPage, nextPageToken: hasNextPage ? page.at(-1)?.id ?? '' : '' };
    return { products: page.map((p) => this.toProto(p)), pageInfo };
  }

  async createProduct(request: CreateProductRequest, actorRole = ''): Promise<Product> {
    this.requireAdmin(actorRole);
    const currency = request.price?.currency?.trim().toUpperCase() || 'VND';
    if (!request.name.trim() || !request.slug.trim() || request.stockQuantity < 0 || !request.price || request.price.amountMinor < 0 || !/^[A-Z]{3}$/.test(currency)) {
      this.error('INVALID_ARGUMENT', 'Invalid product fields');
    }
    try {
      const product = await this.prisma.product.create({ data: {
        slug: request.slug.trim(), name: request.name.trim(), description: request.description ?? '',
        priceAmountMinor: BigInt(request.price.amountMinor), currency,
        stockQuantity: request.stockQuantity,
        colors: request.colors || [],
        sizes: request.sizes || [],
        images: request.images || {},
      } });
      return this.toProto(product);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') this.error('ALREADY_EXISTS', 'Slug already exists');
      throw e;
    }
  }

  async updateProduct(request: UpdateProductRequest, actorRole = ''): Promise<Product> {
    this.requireAdmin(actorRole);
    const existing = await this.prisma.product.findUnique({ where: { id: request.productId } });
    if (!existing) this.error('NOT_FOUND', 'Product not found');
    if (existing.status === ProductStatus.ARCHIVED) this.error('FAILED_PRECONDITION', 'Archived product cannot be updated');
    const currency = request.price?.currency?.trim().toUpperCase() || 'VND';
    if ((request.stockQuantity !== undefined && request.stockQuantity < 0) || (request.price && (request.price.amountMinor < 0 || !/^[A-Z]{3}$/.test(currency)))) this.error('INVALID_ARGUMENT', 'Invalid product fields');
    const product = await this.prisma.product.update({ where: { id: request.productId }, data: {
      ...(request.name ? { name: request.name.trim() } : {}), ...(request.description ? { description: request.description } : {}),
      ...(request.stockQuantity !== undefined ? { stockQuantity: request.stockQuantity } : {}),
      ...(request.price ? { priceAmountMinor: BigInt(request.price.amountMinor), currency } : {}),
      ...(request.colors?.length ? { colors: request.colors } : {}),
      ...(request.sizes?.length ? { sizes: request.sizes } : {}),
      ...(Object.keys(request.images || {}).length ? { images: request.images } : {}),
    } });
    return this.toProto(product);
  }

  async archiveProduct(request: ArchiveProductRequest, actorRole = ''): Promise<Empty> {
    this.requireAdmin(actorRole);
    const product = await this.prisma.product.findUnique({ where: { id: request.productId } });
    if (!product) this.error('NOT_FOUND', 'Product not found');
    if (product.status === ProductStatus.ACTIVE) await this.prisma.product.update({ where: { id: request.productId }, data: { status: ProductStatus.ARCHIVED } });
    return {};
  }

  async reserveStock(request: ReserveStockRequest): Promise<ReserveStockResponse> {
    if (!request.reservationId || !request.lines.length || request.lines.some((line) => line.quantity <= 0) || new Set(request.lines.map((line) => line.productId)).size !== request.lines.length) this.error('INVALID_ARGUMENT', 'Invalid reservation');
    return this.prisma.$transaction(async (tx) => {
      const existing = await tx.stockReservation.findUnique({ where: { reservationId: request.reservationId } });
      if (existing) {
        if (existing.status === ReservationStatus.RELEASED) this.error('FAILED_PRECONDITION', 'Reservation already released');
        return { reservationId: request.reservationId, reserved: true };
      }
      for (const line of request.lines) {
        const product = await tx.product.findUnique({ where: { id: line.productId } });
        if (!product || product.status !== ProductStatus.ACTIVE || product.stockQuantity < line.quantity) this.error('FAILED_PRECONDITION', 'Insufficient stock');
      }
      for (const line of request.lines) await tx.product.update({ where: { id: line.productId }, data: { stockQuantity: { decrement: line.quantity } } });
      await tx.stockReservation.create({ data: { reservationId: request.reservationId, items: { create: request.lines.map((line) => ({ productId: line.productId, quantity: line.quantity })) } } });
      return { reservationId: request.reservationId, reserved: true };
    });
  }

  async releaseStock(request: ReleaseStockRequest): Promise<Empty> {
    await this.prisma.$transaction(async (tx) => {
      const reservation = await tx.stockReservation.findUnique({ where: { reservationId: request.reservationId }, include: { items: true } });
      if (!reservation) this.error('NOT_FOUND', 'Reservation not found');
      if (reservation.status === ReservationStatus.RELEASED) return;
      for (const item of reservation.items) await tx.product.update({ where: { id: item.productId }, data: { stockQuantity: { increment: item.quantity } } });
      await tx.stockReservation.update({ where: { reservationId: request.reservationId }, data: { status: ReservationStatus.RELEASED, releasedAt: new Date() } });
    });
    return {};
  }

  async getInventoryMetrics(_request: GetInventoryMetricsRequest, actorRole = ''): Promise<InventoryMetrics> {
    this.requireAdmin(actorRole);
    const [total, active, lowStock, outOfStock] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.product.count({ where: { status: ProductStatus.ACTIVE } }),
      this.prisma.product.count({ where: { status: ProductStatus.ACTIVE, stockQuantity: { lte: 20 } } }),
      this.prisma.product.count({ where: { status: ProductStatus.ACTIVE, stockQuantity: 0 } }),
    ]);
    return { totalProducts: total, activeProducts: active, lowStockProducts: lowStock, outOfStockProducts: outOfStock };
  }
}
