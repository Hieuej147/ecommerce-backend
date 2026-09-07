import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PAYMENT_V1_PACKAGE_NAME } from '@app/contracts/generated/payment';
import { PaymentsController } from './payments.controller';
import { PaymentsGrpcService } from './payments.grpc.service';
import { InngestModule } from '../inngest/inngest.module';
import { OrdersModule } from '../orders/orders.module';

@Module({ imports: [ConfigModule, InngestModule, OrdersModule, ClientsModule.registerAsync([{ name: 'PAYMENT_GRPC', imports: [ConfigModule], inject: [ConfigService], useFactory: (c: ConfigService) => ({ transport: Transport.GRPC, options: { package: PAYMENT_V1_PACKAGE_NAME, protoPath: join(process.cwd(), 'proto/payment.proto'), url: c.get('PAYMENT_GRPC_URL') || 'localhost:5003' } }) }])], controllers: [PaymentsController], providers: [PaymentsGrpcService], exports: [PaymentsGrpcService] })
export class PaymentsModule {}
