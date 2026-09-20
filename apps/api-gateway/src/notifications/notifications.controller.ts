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
import {
  NotificationDto,
  UnreadCountDto,
  ErrorResponseDto,
} from '../swagger/dtos';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({
    summary: 'List notifications',
    description:
      'Returns the list of personal or role-targeted notifications for the authenticated user/admin. Can be filtered to unread only or by notification event type.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Max items to return (default: 50)',
    example: 50,
  })
  @ApiQuery({
    name: 'unreadOnly',
    required: false,
    type: Boolean,
    description: 'Only return unread notifications',
    example: false,
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description:
      'Filter by notification category or event type (e.g. ORDER_CREATED, PAYMENT_SUCCESS, PRODUCT_LOW_STOCK)',
    example: 'ORDER_CREATED',
  })
  @ApiResponse({
    status: 200,
    type: [NotificationDto],
    description: 'List of notifications',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
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
  @ApiOperation({
    summary: 'Get unread notifications count',
    description:
      'Returns the number of unread notifications for badge count display on the bell icon in frontend navigation.',
  })
  @ApiResponse({
    status: 200,
    type: UnreadCountDto,
    description: 'Count of unread notifications',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  async getUnreadCount(@CurrentActor() actor: ActorContext) {
    return this.notificationsService.getUnreadCount(actor);
  }

  @Patch(':id/read')
  @ApiOperation({
    summary: 'Mark single notification as read',
    description:
      'Updates the read flag of a specific notification to true and sets the readAt timestamp.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Notification unique identifier (UUID)',
    example: 'notif_77a1b2c3-d4e5-6789-0123-abcdef456789',
  })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read successfully',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'Notification not found',
  })
  async markAsRead(
    @Param('id') id: string,
    @CurrentActor() actor: ActorContext,
  ) {
    return this.notificationsService.markAsRead(id, actor);
  }

  @Post('read-all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Mark all notifications as read',
    description:
      'Marks all notifications for the current authenticated user as read in bulk.',
  })
  @ApiResponse({
    status: 200,
    description: 'All notifications marked as read',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized',
  })
  async markAllAsRead(@CurrentActor() actor: ActorContext) {
    return this.notificationsService.markAllAsRead(actor);
  }
}
