import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  USERS_SERVICE_NAME,
  type DeleteClerkUserRequest,
  type ListUsersRequest,
  type UpsertClerkUserRequest,
  type UsersServiceClient,
} from '@app/contracts/generated/users';

@Injectable()
export class UsersGrpcService implements OnModuleInit {
  private service!: UsersServiceClient;

  constructor(@Inject('USERS_GRPC') private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.service = this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  getByClerkId(clerkId: string) {
    return firstValueFrom(this.service.getUserByClerkId({ clerkId }));
  }

  upsert(input: UpsertClerkUserRequest) {
    return firstValueFrom(this.service.upsertClerkUser(input));
  }

  remove(input: DeleteClerkUserRequest) {
    return firstValueFrom(this.service.deleteClerkUser(input));
  }

  list(input: ListUsersRequest) {
    return firstValueFrom(this.service.listUsers(input));
  }
}
