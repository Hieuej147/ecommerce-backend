import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from 'dotenv';
import { join } from 'path';
import { CatalogModule } from './catalog.module';
import { CATALOG_V1_PACKAGE_NAME } from '@app/contracts/generated/catalog';

config({
  path: join(process.cwd(), '.env'),
});

async function bootstrap() {
  const grpcUrl = process.env.CATALOG_GRPC_URL?.trim() || '0.0.0.0:5001';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.GRPC,
      options: {
        package: CATALOG_V1_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto/catalog.proto'),
        url: grpcUrl,
      },
    },
  );
  console.log(`catalog service running at ${grpcUrl}`);
  await app.listen();
}
void bootstrap();
