import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { PaymentServiceClient } from '@app/contracts/generated/payment';
import type { Metadata } from '@grpc/grpc-js';
@Injectable()
export class PaymentsGrpcService implements OnModuleInit {
  private service!: PaymentServiceClient;
  constructor(@Inject('PAYMENT_GRPC') private readonly client: ClientGrpc) {}
  onModuleInit() {
    this.service =
      this.client.getService<PaymentServiceClient>('PaymentService');
  }
  checkout(
    input: Parameters<PaymentServiceClient['createCheckoutSession']>[0],
    metadata?: Metadata,
  ) {
    return firstValueFrom((this.service.createCheckoutSession as any)(input, metadata));
  }
  get(id: string, metadata?: Metadata) {
    return firstValueFrom((this.service.getPayment as any)({ paymentId: id }, metadata));
  }
  webhook(rawBody: Buffer, signature: string) {
    return firstValueFrom(
      this.service.processWebhook({ rawBody, stripeSignature: signature }),
    );
  }
  metrics(input: { fromAt?: string; toAt?: string }, metadata?: Metadata) {
    return firstValueFrom((this.service.getPaymentMetrics as any)({ fromAt: input.fromAt ?? '', toAt: input.toAt ?? '' }, metadata));
  }
}
