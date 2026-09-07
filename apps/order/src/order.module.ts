import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CATALOG_V1_PACKAGE_NAME } from '@app/contracts/generated/catalog';
import { CatalogClient } from './catalog.client';
@Module({ imports: [ConfigModule, ClientsModule.registerAsync([{ name: 'CATALOG_GRPC', imports: [ConfigModule], inject: [ConfigService], useFactory: (c: ConfigService) => ({ transport: Transport.GRPC, options: { package: CATALOG_V1_PACKAGE_NAME, protoPath: join(process.cwd(), 'proto/catalog.proto'), url: c.get('CATALOG_GRPC_URL') || 'localhost:5001' } }) }])], controllers: [OrderController], providers: [OrderService, PrismaService, CatalogClient, { provide: 'CATALOG_READER', useExisting: CatalogClient }] })
export class OrderModule {}
