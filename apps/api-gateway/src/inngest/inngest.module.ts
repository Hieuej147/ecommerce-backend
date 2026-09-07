import { Module } from '@nestjs/common';
import { InngestController } from './inngest.controller';
import { InngestEventsService } from './inngest.client';
import { EmailService } from './email.service';
@Module({ controllers: [InngestController], providers: [InngestEventsService, EmailService], exports: [InngestEventsService] })
export class InngestModule {}
