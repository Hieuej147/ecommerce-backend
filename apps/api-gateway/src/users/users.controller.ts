import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiExcludeController } from '@nestjs/swagger';
import { CurrentUserDto } from '../swagger/dtos';
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
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200, type: CurrentUserDto })
  getCurrentUser(@CurrentActor() actor: ActorContext) {
    return this.users.current(actor);
  }
}

@ApiExcludeController()
@Controller('admin/users')
@UseGuards(AdminGuard)
export class AdminUsersController {
  constructor(private readonly users: UsersGrpcService) {}

  @Get()
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
  get(@Param('clerkId') clerkId: string) {
    return this.users.getByClerkId(clerkId);
  }
}
