import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ORDER_V1_PACKAGE_NAME } from '@app/contracts/generated/order';
import { OrderModule } from './order.module';
async function bootstrap() { const url = process.env.ORDER_GRPC_URL?.trim() || '0.0.0.0:5002'; const app = await NestFactory.createMicroservice<MicroserviceOptions>(OrderModule, { transport: Transport.GRPC, options: { package: ORDER_V1_PACKAGE_NAME, protoPath: join(process.cwd(), 'proto/order.proto'), url } }); console.log(`order service running at ${url}`); await app.listen(); }
void bootstrap();
