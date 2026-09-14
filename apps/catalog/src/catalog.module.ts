import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [CatalogController],
  providers: [CatalogService, PrismaService],
  exports: [StorageModule],
})
export class CatalogModule {}
