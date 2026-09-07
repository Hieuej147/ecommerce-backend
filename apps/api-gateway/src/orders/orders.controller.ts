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
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import {
  OrderDto,
  CreateOrderBodyDto,
  ListOrdersResponseDto,
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
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 201, type: OrderDto })
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
  @ApiOperation({ summary: 'List my orders' })
  @ApiResponse({ status: 200, type: ListOrdersResponseDto })
  async list(@CurrentActor() actor: ActorContext) {
    const res = await this.orders.list(createActorMetadata(actor));
    return {
      orders: res?.orders ?? [],
      pageInfo: res?.pageInfo ?? { hasNextPage: false, nextPageToken: '' },
    };
  }
  @UseGuards(AdminGuard)
  @Get('admin')
  @ApiExcludeEndpoint()
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
  @ApiExcludeEndpoint()
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
  @ApiOperation({ summary: 'Get order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: OrderDto })
  get(@Param('id') id: string, @CurrentActor() actor: ActorContext) {
    return this.orders.get(id, createActorMetadata(actor));
  }
  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: OrderDto })
  cancel(@Param('id') id: string, @CurrentActor() actor: ActorContext) {
    return this.orders.cancel(id, createActorMetadata(actor));
  }
}
