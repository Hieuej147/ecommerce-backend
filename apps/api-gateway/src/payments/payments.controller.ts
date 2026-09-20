import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
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
  ApiBody,
} from '@nestjs/swagger';
import {
  CheckoutBodyDto,
  CheckoutResponseDto,
  PaymentDto,
  PaymentMetricsDto,
  ErrorResponseDto,
} from '../swagger/dtos';
import type { Request } from 'express';
import { Public } from '../auth/decorators/public.decorator';
import { PaymentsGrpcService } from './payments.grpc.service';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import { createActorMetadata } from '../auth/grpc-actor-metadata';
import type { ActorContext } from '../auth/types/actor-context';
import { AdminGuard } from '../auth/guards/admin.guard';
import { InngestEventsService } from '../inngest/inngest.client';
import { OrdersGrpcService } from '../orders/orders.grpc.service';
import type { Order } from '@app/contracts/generated/order';

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly payments: PaymentsGrpcService,
    private readonly inngest: InngestEventsService,
    private readonly orders: OrdersGrpcService,
  ) {}

  @Post('checkout')
  @ApiOperation({
    summary: 'Create Stripe Checkout session',
    description:
      'Initiates a Stripe Checkout Session for an unpaid order (PENDING_PAYMENT). Returns a hosted checkoutUrl. The frontend should redirect the user or open an in-app browser. Upon completion, Stripe redirects back to successUrl or cancelUrl, and emits a webhook that updates the order to PAID.',
  })
  @ApiBody({ type: CheckoutBodyDto })
  @ApiResponse({
    status: 201,
    type: CheckoutResponseDto,
    description: 'Checkout session created with hosted URL',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponseDto,
    description: 'Order not eligible for checkout or invalid parameters',
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
  async checkout(
    @Body() body: CheckoutBodyDto,
    @CurrentActor() actor: ActorContext,
  ) {
    const res = (await this.payments.checkout(
      {
        orderId: body.orderId || '',
        successUrl: body.successUrl || '',
        cancelUrl: body.cancelUrl || '',
        idempotencyKey: body.idempotencyKey || '',
      },
      createActorMetadata(actor),
    )) as any;
    return {
      ...res,
      sessionUrl: res?.checkoutUrl || '',
    };
  }

  @UseGuards(AdminGuard)
  @Get('admin/metrics')
  @ApiOperation({
    summary: 'Get payment metrics (Admin)',
    description:
      'Requires Admin role. Retrieves aggregated counts for total, paid, failed, and pending transactions.',
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
    type: PaymentMetricsDto,
    description: 'Payment aggregate statistics',
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
    const res = (await this.payments.metrics(
      { fromAt: from, toAt: to },
      createActorMetadata(actor),
    )) as any;
    const toNumber = (v: any) =>
      v && typeof v === 'object' && 'low' in v ? Number(v.low) : Number(v) || 0;
    return {
      totalCount: toNumber(res?.totalCount),
      paidCount: toNumber(res?.paidCount),
      failedCount: toNumber(res?.failedCount),
      pendingCount: toNumber(res?.pendingCount),
      currency: res?.currency || 'VND',
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get payment details by ID',
    description:
      'Retrieves the status, amount, and provider payment identifier for a specific payment UUID.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Payment unique identifier (UUID)',
    example: 'pay_98765432-1234-5678-90ab-cdef12345678',
  })
  @ApiResponse({
    status: 200,
    type: PaymentDto,
    description: 'Payment details',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Payment not found',
  })
  get(@Param('id') id: string, @CurrentActor() actor: ActorContext) {
    return this.payments.get(id, createActorMetadata(actor));
  }

  @Public()
  @Post(['webhook', 'webhook/stripe'])
  @ApiExcludeEndpoint()
  async webhook(
    @Req() req: Request & { rawBody?: Buffer },
    @Headers('stripe-signature') signature?: string,
  ) {
    const result = await this.payments.webhook(
      req.rawBody || Buffer.from(JSON.stringify(req.body)),
      signature || '',
    );
    if (result.orderId && result.paymentStatus !== 'IGNORED') {
      void this.publishPaymentEvent(result);
    }
    return result;
  }

  private async publishPaymentEvent(result: {
    paymentId: string;
    orderId: string;
    paymentStatus: string;
    providerEventId: string;
  }) {
    try {
      const order = (await this.orders.get(result.orderId)) as Order;
      await this.inngest.paymentStatusChanged({
        paymentId: result.paymentId,
        orderId: result.orderId,
        userId: order.userId,
        email: order.customerEmail,
        status: result.paymentStatus,
        paymentStatus: result.paymentStatus,
        providerEventId: result.providerEventId,
      });
    } catch {
      await this.inngest.paymentStatusChanged({
        paymentId: result.paymentId,
        orderId: result.orderId,
        status: result.paymentStatus,
        paymentStatus: result.paymentStatus,
        providerEventId: result.providerEventId,
      });
    }
  }
}
