import { Controller } from '@nestjs/common';
import type { Metadata } from '@grpc/grpc-js';
import { PaymentServiceControllerMethods } from '@app/contracts/generated/payment';
import { PaymentService } from './payment.service';
@Controller()
@PaymentServiceControllerMethods()
export class PaymentController {
  constructor(private readonly service: PaymentService) {}
  createCheckoutSession(r: any, metadata?: Metadata) { return this.service.createCheckoutSession(r, String(metadata?.get('x-user-id')?.[0] ?? '')); }
  getPayment(r: any, metadata?: Metadata) {
    return this.service.getPayment(
      r,
      String(metadata?.get('x-user-id')?.[0] ?? ''),
      String(metadata?.get('x-user-role')?.[0] ?? ''),
    );
  }
  processWebhook(r: any) { return this.service.processWebhook(r); }
  getPaymentMetrics(r: any, metadata?: Metadata) { return this.service.getPaymentMetrics(r, String(metadata?.get('x-user-role')?.[0] ?? '')); }
}
