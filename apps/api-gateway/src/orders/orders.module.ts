import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDER_V1_PACKAGE_NAME } from '@app/contracts/generated/order';
import { OrdersController } from './orders.controller';
import { OrdersGrpcService } from './orders.grpc.service';
import { InngestModule } from '../inngest/inngest.module';

@Module({
  imports: [
    ConfigModule,
    InngestModule,
    ClientsModule.registerAsync([
      {
        name: 'ORDER_GRPC',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (c: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: ORDER_V1_PACKAGE_NAME,
            protoPath: join(process.cwd(), 'proto/order.proto'),
            url: c.get('ORDER_GRPC_URL') || 'localhost:5002',
            loader: {
              defaults: true,
              arrays: true,
              objects: true,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersGrpcService],
  exports: [OrdersGrpcService],
})
export class OrdersModule {}
