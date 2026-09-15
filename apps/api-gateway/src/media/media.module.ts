import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [MediaController],
  exports: [StorageModule],
})
export class MediaModule {}
