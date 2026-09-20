import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import {
  CurrentUserDto,
  ListUsersResponseDto,
  ErrorResponseDto,
} from '../swagger/dtos';
import { CurrentActor } from '../auth/decorators/current-actor.decorator';
import { AdminGuard } from '../auth/guards/admin.guard';
import type { ActorContext } from '../auth/types/actor-context';
import { UsersGrpcService } from './users.grpc.service';
import { UsersService } from './users.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('me')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get current user profile',
    description:
      'Fetches the user profile for the authenticated Clerk session. Lazily syncs user data from Clerk API to local database if not already cached.',
  })
  @ApiResponse({
    status: 200,
    type: CurrentUserDto,
    description: 'Current user profile',
  })
  @ApiResponse({
    status: 401,
    type: ErrorResponseDto,
    description: 'Unauthorized: missing or invalid Bearer token',
  })
  getCurrentUser(@CurrentActor() actor: ActorContext) {
    return this.users.current(actor);
  }
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('admin/users')
@UseGuards(AdminGuard)
export class AdminUsersController {
  constructor(private readonly users: UsersGrpcService) {}

  @Get()
  @ApiOperation({
    summary: 'List all users (Admin)',
    description:
      'Requires Admin role. Returns a paginated list of all platform users with filtering by role, status, or search query.',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of users per page (default: 20)',
    example: 20,
  })
  @ApiQuery({
    name: 'pageToken',
    required: false,
    type: String,
    description: 'Cursor token for pagination',
    example: '',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search string for name, email, or Clerk ID',
    example: 'Nguyen',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    type: String,
    description: 'Filter by role (customer or admin)',
    example: 'customer',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
    description: 'Filter by status (active, suspended, deleted)',
    example: 'active',
  })
  @ApiResponse({
    status: 200,
    type: ListUsersResponseDto,
    description: 'List of users',
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
  list(
    @Query('pageSize') pageSize?: string,
    @Query('pageToken') pageToken?: string,
    @Query('search') search?: string,
    @Query('role') role?: string,
    @Query('status') userStatus?: string,
  ) {
    return this.users.list({
      page: {
        pageSize: Number(pageSize) || 20,
        pageToken: pageToken ?? '',
      },
      search: search ?? '',
      role: role ?? '',
      status: userStatus ?? '',
    });
  }

  @Get(':clerkId')
  @ApiOperation({
    summary: 'Get user by Clerk ID (Admin)',
    description:
      'Requires Admin role. Retrieves a user profile by their unique Clerk ID.',
  })
  @ApiParam({
    name: 'clerkId',
    type: String,
    description: 'Clerk User ID (user_...)',
    example: 'user_2bA9kL0xZy123',
  })
  @ApiResponse({
    status: 200,
    type: CurrentUserDto,
    description: 'User details',
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
  @ApiResponse({
    status: 404,
    type: ErrorResponseDto,
    description: 'User not found',
  })
  get(@Param('clerkId') clerkId: string) {
    return this.users.getByClerkId(clerkId);
  }
}
