import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import { createActorMetadata } from '../auth/grpc-actor-metadata';
import type { ActorContext } from '../auth/types/actor-context';
import { AdminOverviewService } from './admin-overview.service';
import { AdminOverviewDto, ErrorResponseDto } from '../swagger/dtos';

@ApiTags('Admin / Overview')
@ApiBearerAuth()
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminOverviewController {
  constructor(private readonly overview: AdminOverviewService) {}

  @Get('overview')
  @ApiOperation({
    summary: 'Get store administration overview',
    description:
      'Requires Admin role. Aggregates revenue, order volume, average order value, payment success health rate, inventory summary, low-stock items, and exception orders.',
  })
  @ApiResponse({
    status: 200,
    type: AdminOverviewDto,
    description: 'Store overview dashboard statistics',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponseDto,
    description: 'Forbidden: Admin role required',
  })
  get(@CurrentActor() actor: ActorContext) {
    return this.overview.get(createActorMetadata(actor));
  }
}
