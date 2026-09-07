import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { ListProductsResponseDto, ProductDto, CreateProductBodyDto, UpdateProductBodyDto } from '../swagger/dtos';
import { Public } from '../auth/decorators/public.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CatalogGrpcService } from './catalog.grpc.service';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import { createActorMetadata } from '../auth/grpc-actor-metadata';
import type { ActorContext } from '../auth/types/actor-context';
import { InngestEventsService } from '../inngest/inngest.client';
import type { Product } from '@app/contracts/generated/catalog';

interface ProductBody {
  slug?: string;
  name?: string;
  description?: string;
  stockQuantity?: number | string;
  priceAmountMinor?: number | string;
  currency?: string;
  price?: { amountMinor?: number | string; currency?: string };
  colors?: string[];
  sizes?: string[];
  images?: Record<string, string>;
}

@ApiTags('Products')
@Controller('products')
export class CatalogController {
  constructor(
    private readonly catalog: CatalogGrpcService,
    private readonly inngest: InngestEventsService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List products' })
  @ApiQuery({ name: 'pageSize', required: false, type: String })
  @ApiQuery({ name: 'pageToken', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiResponse({ status: 200, type: ListProductsResponseDto })
  list(@Query() query: { pageSize?: string; pageToken?: string; search?: string; status?: string }) {
    return this.catalog.listProducts({ pageSize: Number(query.pageSize) || 20, pageToken: query.pageToken, search: query.search, status: query.status });
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get product' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: ProductDto })
  get(@Param('id') id: string) { return this.catalog.getProduct(id); }

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() body: ProductBody, @CurrentActor() actor: ActorContext) { const product = await this.catalog.createProduct({
    slug: body.slug ?? '', name: body.name ?? '', description: body.description ?? '', stockQuantity: Number(body.stockQuantity ?? 0),
    price: { amountMinor: Number(body.price?.amountMinor ?? body.priceAmountMinor ?? 0), currency: body.price?.currency ?? body.currency ?? 'VND' },
    colors: body.colors ?? [], sizes: body.sizes ?? [], images: body.images ?? {}
  }, createActorMetadata(actor)) as Product; this.publishLowStock(product); return product; }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: ProductBody, @CurrentActor() actor: ActorContext) { const product = await this.catalog.updateProduct({
    productId: id, name: body.name ?? '', description: body.description ?? '', ...(body.stockQuantity !== undefined ? { stockQuantity: Number(body.stockQuantity) } : {}),
    price: body.price || body.priceAmountMinor !== undefined ? { amountMinor: Number(body.price?.amountMinor ?? body.priceAmountMinor), currency: body.price?.currency ?? body.currency ?? 'VND' } : undefined,
    colors: body.colors || [],
    sizes: body.sizes || [],
    images: body.images || {}
  }, createActorMetadata(actor)) as Product; this.publishLowStock(product); return product; }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiExcludeEndpoint()
  archive(@Param('id') id: string, @CurrentActor() actor: ActorContext) { return this.catalog.archiveProduct(id, createActorMetadata(actor)); }

  private publishLowStock(product: Product) {
    const threshold = product.reorderPoint || 20;
    if (product.stockQuantity <= threshold) {
      void this.inngest.productLowStock({ productId: product.id, productName: product.name, stockQuantity: product.stockQuantity, threshold });
    }
  }
}
