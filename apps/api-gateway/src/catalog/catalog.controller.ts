import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import {
  ListProductsResponseDto,
  ProductDto,
  CreateProductBodyDto,
  UpdateProductBodyDto,
  PresignedUploadUrlBodyDto,
  PresignedUploadUrlDto,
  ErrorResponseDto,
} from '../swagger/dtos';
import { Public } from '../auth/decorators/public.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CatalogGrpcService } from './catalog.grpc.service';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import { createActorMetadata } from '../auth/grpc-actor-metadata';
import type { ActorContext } from '../auth/types/actor-context';
import { InngestEventsService } from '../inngest/inngest.client';
import type { Product } from '@app/contracts/generated/catalog';

@ApiTags('Products')
@Controller('products')
export class CatalogController {
  constructor(
    private readonly catalog: CatalogGrpcService,
    private readonly inngest: InngestEventsService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'List products',
    description:
      'Public endpoint to browse and search the product catalog. Supports pagination, keyword search, and status filtering.',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of products per page (default: 20)',
    example: 20,
  })
  @ApiQuery({
    name: 'pageToken',
    required: false,
    type: String,
    description: 'Pagination token for the next page',
    example: '',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search string matching product title or description',
    example: 'nmd',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'Filter by lifecycle status (e.g. ACTIVE, ARCHIVED, DRAFT)',
    example: 'ACTIVE',
  })
  @ApiResponse({
    status: 200,
    type: ListProductsResponseDto,
    description: 'Successfully retrieved products list',
  })
  async list(
    @Query()
    query: {
      pageSize?: string;
      pageToken?: string;
      search?: string;
      status?: string;
    },
  ) {
    const res = await this.catalog.listProducts({
      pageSize: Number(query.pageSize) || 20,
      pageToken: query.pageToken,
      search: query.search,
      status: query.status,
    });
    return {
      products: res?.products ?? [],
      pageInfo: res?.pageInfo ?? { hasNextPage: false, nextPageToken: '' },
    };
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description:
      'Public endpoint to retrieve a single product by its unique UUID or slug, including variant colors, sizes, and images.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product unique identifier (UUID)',
    example: 'prod_90fa8b21-4f32-45a8-bf2b-5e6f66300001',
  })
  @ApiResponse({
    status: 200,
    type: ProductDto,
    description: 'Product found and returned',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Product not found',
  })
  get(@Param('id') id: string) {
    return this.catalog.getProduct(id);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post('upload-url')
  @ApiOperation({
    summary:
      'DEPRECATED: Use POST /v1/media/upload instead. Legacy upload-url endpoint',
    description:
      'Generates a presigned S3/MinIO upload URL. Deprecated in favor of the direct multipart POST /v1/media/upload.',
    deprecated: true,
  })
  @ApiBody({ type: PresignedUploadUrlBodyDto })
  @ApiResponse({
    status: 200,
    type: PresignedUploadUrlDto,
    description: 'Presigned upload URL generated successfully',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponseDto,
    description: 'Forbidden: Admin role required',
  })
  getUploadUrl(
    @Body()
    body: PresignedUploadUrlBodyDto,
  ) {
    return this.catalog.getUploadPresignedUrl(body);
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: 'Create a new product',
    description:
      'Requires Admin role. Creates a new catalog item with stock levels, variants, images, and pricing. Automatically triggers a low-stock alert event if initial quantity is <= reorderPoint.',
  })
  @ApiBody({ type: CreateProductBodyDto })
  @ApiResponse({
    status: 201,
    type: ProductDto,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'Validation failed or duplicate slug',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized: missing or invalid Bearer token',
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponseDto,
    description: 'Forbidden: Admin role required',
  })
  async create(
    @Body() body: CreateProductBodyDto,
    @CurrentActor() actor: ActorContext,
  ) {
    const product = (await this.catalog.createProduct(
      {
        slug: body.slug ?? '',
        name: body.name ?? '',
        description: body.description ?? '',
        stockQuantity: Number(body.stockQuantity ?? 0),
        price: {
          amountMinor: Number(
            body.price?.amountMinor ?? body.priceAmountMinor ?? 0,
          ),
          currency: body.price?.currency ?? body.currency ?? 'VND',
        },
        colors: body.colors ?? [],
        sizes: body.sizes ?? [],
        images: body.images ?? {},
        sku: body.sku?.trim() || undefined,
        categorySlug: body.categorySlug?.trim() || '',
        reorderPoint: Number(body.reorderPoint ?? 20),
      },
      createActorMetadata(actor),
    )) as Product;
    this.publishLowStock(product);
    return product;
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({
    summary: 'Update an existing product',
    description:
      'Requires Admin role. Modifies product attributes such as name, description, inventory quantity, price, images, or publishing status.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product unique identifier (UUID)',
    example: 'prod_90fa8b21-4f32-45a8-bf2b-5e6f66300001',
  })
  @ApiBody({ type: UpdateProductBodyDto })
  @ApiResponse({
    status: 200,
    type: ProductDto,
    description: 'Product updated successfully',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'Validation failed',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponseDto,
    description: 'Forbidden: Admin role required',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Product not found',
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProductBodyDto,
    @CurrentActor() actor: ActorContext,
  ) {
    const product = (await this.catalog.updateProduct(
      {
        productId: id,
        name: body.name ?? '',
        description: body.description ?? '',
        ...(body.stockQuantity !== undefined
          ? { stockQuantity: Number(body.stockQuantity) }
          : {}),
        price:
          body.price || body.priceAmountMinor !== undefined
            ? {
                amountMinor: Number(
                  body.price?.amountMinor ?? body.priceAmountMinor,
                ),
                currency: body.price?.currency ?? body.currency ?? 'VND',
              }
            : undefined,
        colors: body.colors || [],
        sizes: body.sizes || [],
        images: body.images || {},
        sku: body.sku?.trim() || undefined,
        categorySlug: body.categorySlug?.trim() || undefined,
        reorderPoint:
          body.reorderPoint !== undefined
            ? Number(body.reorderPoint)
            : undefined,
        status: body.status || undefined,
      },
      createActorMetadata(actor),
    )) as Product;
    this.publishLowStock(product);
    return product;
  }

  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({
    summary: 'Archive a product',
    description:
      'Requires Admin role. Soft-deletes or archives the product, hiding it from default customer listings.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product unique identifier (UUID)',
    example: 'prod_90fa8b21-4f32-45a8-bf2b-5e6f66300001',
  })
  @ApiResponse({
    status: 200,
    description: 'Product archived successfully',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponseDto,
    description: 'Forbidden: Admin role required',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Product not found',
  })
  archive(@Param('id') id: string, @CurrentActor() actor: ActorContext) {
    return this.catalog.archiveProduct(id, createActorMetadata(actor));
  }

  private publishLowStock(product: Product) {
    const threshold = product.reorderPoint || 20;
    if (product.stockQuantity <= threshold) {
      void this.inngest.productLowStock({
        productId: product.id,
        productName: product.name,
        stockQuantity: product.stockQuantity,
        threshold,
      });
    }
  }
}
