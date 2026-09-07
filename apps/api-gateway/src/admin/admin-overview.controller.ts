import { Controller, Get, UseGuards } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import { createActorMetadata } from '../auth/grpc-actor-metadata';
import type { ActorContext } from '../auth/types/actor-context';
import { AdminOverviewService } from './admin-overview.service';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminOverviewController {
  constructor(private readonly overview: AdminOverviewService) {}

  @Get('overview')
  get(@CurrentActor() actor: ActorContext) {
    return this.overview.get(createActorMetadata(actor));
  }
}
