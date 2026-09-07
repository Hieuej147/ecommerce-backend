import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDER_V1_PACKAGE_NAME } from '@app/contracts/generated/order';
import { OrderClient } from './order.client';
@Module({ imports: [ConfigModule, ClientsModule.registerAsync([{ name: 'ORDER_GRPC', imports: [ConfigModule], inject: [ConfigService], useFactory: (c: ConfigService) => ({ transport: Transport.GRPC, options: { package: ORDER_V1_PACKAGE_NAME, protoPath: join(process.cwd(), 'proto/order.proto'), url: c.get('ORDER_GRPC_URL') || 'localhost:5002' } }) }])], controllers: [PaymentController], providers: [PaymentService, PrismaService, OrderClient, { provide: 'ORDER_READER', useExisting: OrderClient }] })
export class PaymentModule {}
