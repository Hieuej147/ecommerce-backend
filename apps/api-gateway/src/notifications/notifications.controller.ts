import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import type { ActorContext } from '../auth/types/actor-context';
import { NotificationDto, UnreadCountDto } from '../swagger/dtos';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List notifications for the current authenticated user or admin' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Max items to return (default 50)' })
  @ApiQuery({ name: 'unreadOnly', required: false, type: Boolean, description: 'Only return unread notifications' })
  @ApiQuery({ name: 'type', required: false, type: String, description: 'Filter by notification type or category (orders, payments, etc.)' })
  @ApiResponse({ status: 200, type: [NotificationDto] })
  async list(
    @CurrentActor() actor: ActorContext,
    @Query('limit') limit?: string,
    @Query('unreadOnly') unreadOnly?: string,
    @Query('type') type?: string,
  ) {
    return this.notificationsService.list(actor, {
      limit,
      unreadOnly,
      type,
    });
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Get unread notifications count for badge display' })
  @ApiResponse({ status: 200, type: UnreadCountDto })
  async getUnreadCount(@CurrentActor() actor: ActorContext) {
    return this.notificationsService.getUnreadCount(actor);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiParam({ name: 'id', type: String, description: 'Notification ID' })
  @ApiResponse({ status: 200, description: 'Notification marked as read' })
  async markAsRead(
    @Param('id') id: string,
    @CurrentActor() actor: ActorContext,
  ) {
    return this.notificationsService.markAsRead(id, actor);
  }

  @Post('read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mark all notifications as read for current user' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(@CurrentActor() actor: ActorContext) {
    return this.notificationsService.markAllAsRead(actor);
  }
}
