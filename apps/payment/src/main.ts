import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PAYMENT_V1_PACKAGE_NAME } from '@app/contracts/generated/payment';
import { PaymentModule } from './payment.module';
async function bootstrap() {
  const url = process.env.PAYMENT_GRPC_URL?.trim() || '0.0.0.0:5003';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PAYMENT_V1_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto/payment.proto'),
        url,
      },
    },
  );
  console.log(`payment service running at ${url}`);
  await app.listen();
}
void bootstrap();
