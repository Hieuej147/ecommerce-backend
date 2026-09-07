import { Controller } from '@nestjs/common';
import {
  UsersServiceControllerMethods,
  type DeleteClerkUserRequest,
  type GetUserByClerkIdRequest,
  type ListUsersRequest,
  type ListUsersResponse,
  type UpsertClerkUserRequest,
  type User,
  type UsersServiceController,
} from '@app/contracts/generated/users';
import type { Empty } from '@app/contracts/generated/common';
import { UsersService } from './users.service';

@Controller()
@UsersServiceControllerMethods()
export class UsersGrpcController implements UsersServiceController {
  constructor(private readonly users: UsersService) {}

  getUserByClerkId(request: GetUserByClerkIdRequest): Promise<User> {
    return this.users.getUserByClerkId(request);
  }

  upsertClerkUser(request: UpsertClerkUserRequest): Promise<User> {
    return this.users.upsertClerkUser(request);
  }

  async deleteClerkUser(request: DeleteClerkUserRequest): Promise<Empty> {
    await this.users.deleteClerkUser(request);
    return {};
  }

  listUsers(request: ListUsersRequest): Promise<ListUsersResponse> {
    return this.users.listUsers(request);
  }
}
