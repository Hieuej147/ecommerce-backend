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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { CheckoutBodyDto, CheckoutResponseDto, PaymentDto } from '../swagger/dtos';
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
  @ApiOperation({ summary: 'Create checkout session' })
  @ApiResponse({ status: 201, type: CheckoutResponseDto })
  checkout(@Body() body: CheckoutBodyDto, @CurrentActor() actor: ActorContext) {
    return this.payments.checkout({
      orderId: body.orderId || '',
      successUrl: body.successUrl || '',
      cancelUrl: body.cancelUrl || '',
      idempotencyKey: body.idempotencyKey || '',
    }, createActorMetadata(actor));
  }
  @UseGuards(AdminGuard)
  @Get('admin/metrics')
  @ApiExcludeEndpoint()
  async metrics(@Query('from') from: string | undefined, @Query('to') to: string | undefined, @CurrentActor() actor: ActorContext) {
    const res = await this.payments.metrics({ fromAt: from, toAt: to }, createActorMetadata(actor)) as any;
    const toNumber = (v: any) => (v && typeof v === 'object' && 'low' in v ? Number(v.low) : Number(v) || 0);
    return {
      totalCount: toNumber(res?.totalCount),
      paidCount: toNumber(res?.paidCount),
      failedCount: toNumber(res?.failedCount),
      pendingCount: toNumber(res?.pendingCount),
      currency: res?.currency || 'VND',
    };
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get payment' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: PaymentDto })
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


  private async publishPaymentEvent(result: { paymentId: string; orderId: string; paymentStatus: string; providerEventId: string }) {
    try {
      const order = await this.orders.get(result.orderId) as Order;
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

