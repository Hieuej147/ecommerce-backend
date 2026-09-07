import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CATALOG_V1_PACKAGE_NAME } from '@app/contracts/generated/catalog';
import { CatalogController } from './catalog.controller';
import { CatalogGrpcService } from './catalog.grpc.service';
import { InngestModule } from '../inngest/inngest.module';

@Module({
  imports: [ConfigModule, InngestModule, ClientsModule.registerAsync([{
    name: 'CATALOG_GRPC',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
      transport: Transport.GRPC,
      options: {
        package: CATALOG_V1_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto/catalog.proto'),
        url: config.get<string>('CATALOG_GRPC_URL') || 'localhost:5001',
      },
    }),
  }])],
  controllers: [CatalogController],
  providers: [CatalogGrpcService],
  exports: [CatalogGrpcService],
})
export class CatalogModule {}
