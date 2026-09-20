import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Headers,
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
  ApiHeader,
} from '@nestjs/swagger';
import {
  OrderDto,
  CreateOrderBodyDto,
  ListOrdersResponseDto,
  OrderMetricsDto,
  ErrorResponseDto,
} from '../swagger/dtos';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import type { ActorContext } from '../auth/types/actor-context';
import { OrdersGrpcService } from './orders.grpc.service';
import { createActorMetadata } from '../auth/grpc-actor-metadata';
import { AdminGuard } from '../auth/guards/admin.guard';
import { InngestEventsService } from '../inngest/inngest.client';
import type { Order } from '@app/contracts/generated/order';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly orders: OrdersGrpcService,
    private readonly inngest: InngestEventsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new order',
    description:
      'Creates a new order with line items and delivery address for the authenticated user. Checks stock, calculates prices, creates an order with PENDING_PAYMENT status, and emits an orderCreated event.',
  })
  @ApiHeader({
    name: 'idempotency-key',
    required: false,
    description:
      'Optional client-generated UUID to ensure idempotent order creation on network retries',
  })
  @ApiResponse({
    status: 201,
    type: OrderDto,
    description: 'Order placed successfully with status PENDING_PAYMENT',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'Validation failed or item out of stock',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized: authentication token required',
  })
  async create(
    @Body() body: CreateOrderBodyDto,
    @Headers('idempotency-key') key: string | undefined,
    @CurrentActor() actor: ActorContext,
  ) {
    const order = (await this.orders.create(
      {
        items: (body.items || []) as never[],
        shippingAddress: body.shippingAddress as never,
        idempotencyKey: key || String(body.idempotencyKey || ''),
      },
      createActorMetadata(actor),
    )) as Order;
    void this.inngest.orderCreated({
      orderId: order.id,
      userId: actor.userId,
      email: order.customerEmail,
      totalAmountMinor: order.total?.amountMinor ?? 0,
      currency: order.total?.currency ?? 'VND',
    });
    return order;
  }

  @Get()
  @ApiOperation({
    summary: 'List my orders',
    description:
      'Retrieves the list of orders belonging to the currently authenticated customer, ordered by newest first.',
  })
  @ApiResponse({
    status: 200,
    type: ListOrdersResponseDto,
    description: 'Successfully retrieved user orders',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  async list(@CurrentActor() actor: ActorContext) {
    const res = await this.orders.list(createActorMetadata(actor));
    return {
      orders: res?.orders ?? [],
      pageInfo: res?.pageInfo ?? { hasNextPage: false, nextPageToken: '' },
    };
  }

  @UseGuards(AdminGuard)
  @Get('admin')
  @ApiOperation({
    summary: 'List all orders (Admin)',
    description:
      'Requires Admin role. Returns a paginated list of all customer orders across the platform with filtering by status, payment status, customer search, or date range.',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of orders per page (default: 50)',
    example: 50,
  })
  @ApiQuery({
    name: 'pageToken',
    required: false,
    type: String,
    description: 'Cursor token for pagination',
    example: '',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'Filter by order status (e.g. PAID, PENDING_PAYMENT, SHIPPED)',
    example: 'PAID',
  })
  @ApiQuery({
    name: 'paymentStatus',
    required: false,
    type: String,
    description: 'Filter by payment status (e.g. PAID, UNPAID, FAILED)',
    example: 'PAID',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search string for customer name or email',
    example: 'Nguyen',
  })
  @ApiQuery({
    name: 'from',
    required: false,
    type: String,
    description: 'Filter orders created on or after ISO timestamp',
    example: '2026-01-01T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    type: String,
    description: 'Filter orders created on or before ISO timestamp',
    example: '2026-12-31T23:59:59.000Z',
  })
  @ApiResponse({
    status: 200,
    type: ListOrdersResponseDto,
    description: 'Successfully retrieved filtered orders',
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
  async adminList(
    @Query()
    query: {
      pageSize?: string;
      pageToken?: string;
      status?: string;
      paymentStatus?: string;
      search?: string;
      from?: string;
      to?: string;
    },
    @CurrentActor() actor: ActorContext,
  ) {
    const res = await this.orders.adminList(
      {
        pageSize: Number(query.pageSize) || 50,
        pageToken: query.pageToken,
        status: query.status,
        paymentStatus: query.paymentStatus,
        search: query.search,
        fromAt: query.from,
        toAt: query.to,
      },
      createActorMetadata(actor),
    );
    return {
      orders: res?.orders ?? [],
      pageInfo: res?.pageInfo ?? { hasNextPage: false, nextPageToken: '' },
    };
  }

  @UseGuards(AdminGuard)
  @Get('admin/metrics')
  @ApiOperation({
    summary: 'Get order metrics (Admin)',
    description:
      'Requires Admin role. Returns aggregate counts of total, paid, and pending orders along with total platform revenue.',
  })
  @ApiQuery({
    name: 'from',
    required: false,
    type: String,
    description: 'Filter start ISO date',
    example: '2026-01-01T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    type: String,
    description: 'Filter end ISO date',
    example: '2026-12-31T23:59:59.000Z',
  })
  @ApiResponse({
    status: 200,
    type: OrderMetricsDto,
    description: 'Aggregated order statistics',
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
  async metrics(
    @Query('from') from: string | undefined,
    @Query('to') to: string | undefined,
    @CurrentActor() actor: ActorContext,
  ) {
    const res = (await this.orders.metrics(
      { fromAt: from, toAt: to },
      createActorMetadata(actor),
    )) as any;
    const toNumber = (v: any) =>
      v && typeof v === 'object' && 'low' in v ? Number(v.low) : Number(v) || 0;
    return {
      orderCount: toNumber(res?.orderCount),
      paidOrderCount: toNumber(res?.paidOrderCount),
      pendingOrderCount: toNumber(res?.pendingOrderCount),
      revenueAmountMinor: toNumber(res?.revenueAmountMinor),
      currency: res?.currency || 'VND',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get order details',
    description:
      'Retrieves order details by UUID. Customers can only retrieve their own orders; admins can retrieve any order.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Order unique identifier (UUID)',
    example: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  @ApiResponse({
    status: 200,
    type: OrderDto,
    description: 'Order details',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Order not found',
  })
  get(@Param('id') id: string, @CurrentActor() actor: ActorContext) {
    return this.orders.get(id, createActorMetadata(actor));
  }

  @Post(':id/cancel')
  @ApiOperation({
    summary: 'Cancel order',
    description:
      'Cancels an order if it is still unpaid (PENDING_PAYMENT). Releases any stock reservations associated with the order.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Order unique identifier (UUID)',
    example: 'ord_12345678-abcd-ef01-2345-6789abcdef01',
  })
  @ApiResponse({
    status: 200,
    type: OrderDto,
    description: 'Updated order with CANCELLED status',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'Order cannot be cancelled in its current state',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Order not found',
  })
  cancel(@Param('id') id: string, @CurrentActor() actor: ActorContext) {
    return this.orders.cancel(id, createActorMetadata(actor));
  }
}
