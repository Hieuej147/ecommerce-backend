import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';
import {
  Prisma,
  UserRole,
  UserStatus,
  type User as PrismaUser,
} from '../generated/prisma/client';
import type {
  DeleteClerkUserRequest,
  GetUserByClerkIdRequest,
  ListUsersRequest,
  ListUsersResponse,
  UpsertClerkUserRequest,
  User,
} from '@app/contracts/generated/users';
import { PrismaService } from './prisma.service';
import { toProtoUser } from './user.mapper';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByClerkId(request: GetUserByClerkIdRequest): Promise<User> {
    if (!request.clerkId) this.fail(status.INVALID_ARGUMENT, 'clerk_id is required');
    const user = await this.prisma.user.findUnique({
      where: { clerkId: request.clerkId },
    });
    if (!user || user.status === UserStatus.DELETED) {
      this.fail(status.NOT_FOUND, 'User not found');
    }
    return toProtoUser(user);
  }

  async upsertClerkUser(request: UpsertClerkUserRequest): Promise<User> {
    this.requireEvent(request.eventId, request.clerkId);
    const role = this.toRole(request.role);
    const payload = this.parsePayload(request.payloadJson);
    const clerkCreatedAt = this.parseOptionalDate(request.clerkCreatedAt);

    try {
      const user = await this.prisma.$transaction(async (tx) => {
        const processed = await tx.clerkWebhookEvent.findUnique({
          where: { eventId: request.eventId },
        });
        if (processed) return this.requireExisting(tx, request.clerkId);

        const result = await tx.user.upsert({
          where: { clerkId: request.clerkId },
          create: {
            clerkId: request.clerkId,
            email: request.email || null,
            firstName: request.firstName || null,
            lastName: request.lastName || null,
            displayName: request.displayName || null,
            imageUrl: request.imageUrl || null,
            role,
            status: UserStatus.ACTIVE,
            clerkCreatedAt,
          },
          update: {
            email: request.email || null,
            firstName: request.firstName || null,
            lastName: request.lastName || null,
            displayName: request.displayName || null,
            imageUrl: request.imageUrl || null,
            role,
            status: UserStatus.ACTIVE,
            deletedAt: null,
            ...(clerkCreatedAt ? { clerkCreatedAt } : {}),
          },
        });

        await tx.clerkWebhookEvent.create({
          data: {
            eventId: request.eventId,
            eventType: request.eventType || 'user.updated',
            payload,
            processedAt: new Date(),
          },
        });
        return result;
      });
      return toProtoUser(user);
    } catch (error) {
      if (this.isDuplicateEvent(error)) {
        return this.getUserByClerkId({ clerkId: request.clerkId });
      }
      throw error;
    }
  }

  async deleteClerkUser(request: DeleteClerkUserRequest): Promise<void> {
    this.requireEvent(request.eventId, request.clerkId);
    const payload = this.parsePayload(request.payloadJson);

    try {
      await this.prisma.$transaction(async (tx) => {
        const processed = await tx.clerkWebhookEvent.findUnique({
          where: { eventId: request.eventId },
        });
        if (processed) return;

        await tx.user.upsert({
          where: { clerkId: request.clerkId },
          create: {
            clerkId: request.clerkId,
            status: UserStatus.DELETED,
            deletedAt: new Date(),
          },
          update: {
            status: UserStatus.DELETED,
            deletedAt: new Date(),
          },
        });
        await tx.clerkWebhookEvent.create({
          data: {
            eventId: request.eventId,
            eventType: 'user.deleted',
            payload,
            processedAt: new Date(),
          },
        });
      });
    } catch (error) {
      if (!this.isDuplicateEvent(error)) throw error;
    }
  }

  async listUsers(request: ListUsersRequest): Promise<ListUsersResponse> {
    const pageSize = Math.min(Math.max(request.page?.pageSize || 20, 1), 100);
    const cursor = request.page?.pageToken || undefined;
    const search = request.search.trim();
    const role = request.role ? this.toRole(request.role, true) : undefined;
    const userStatus = request.status
      ? this.toStatus(request.status)
      : UserStatus.ACTIVE;

    const users = await this.prisma.user.findMany({
      where: {
        status: userStatus,
        ...(role ? { role } : {}),
        ...(search
          ? {
              OR: [
                { clerkId: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { displayName: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: pageSize + 1,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    });
    const hasNextPage = users.length > pageSize;
    const page = users.slice(0, pageSize);
    return {
      users: page.map(toProtoUser),
      pageInfo: {
        hasNextPage,
        nextPageToken: hasNextPage ? (page.at(-1)?.id ?? '') : '',
      },
    };
  }

  private requireEvent(eventId: string, clerkId: string): void {
    if (!eventId) this.fail(status.INVALID_ARGUMENT, 'event_id is required');
    if (!clerkId) this.fail(status.INVALID_ARGUMENT, 'clerk_id is required');
  }

  private parsePayload(value: string): Prisma.InputJsonValue {
    if (!value) return {};
    try {
      return JSON.parse(value) as Prisma.InputJsonValue;
    } catch {
      this.fail(status.INVALID_ARGUMENT, 'payload_json must be valid JSON');
    }
  }

  private parseOptionalDate(value: string): Date | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      this.fail(status.INVALID_ARGUMENT, 'clerk_created_at must be an ISO date');
    }
    return date;
  }

  private toRole(value: string, strict = false): UserRole {
    const normalized = value.trim().toUpperCase();
    if (normalized === UserRole.ADMIN) return UserRole.ADMIN;
    if (!normalized || normalized === UserRole.CUSTOMER) return UserRole.CUSTOMER;
    if (strict) this.fail(status.INVALID_ARGUMENT, 'Invalid user role');
    return UserRole.CUSTOMER;
  }

  private toStatus(value: string): UserStatus {
    const normalized = value.trim().toUpperCase();
    if (normalized === UserStatus.ACTIVE) return UserStatus.ACTIVE;
    if (normalized === UserStatus.DELETED) return UserStatus.DELETED;
    this.fail(status.INVALID_ARGUMENT, 'Invalid user status');
  }

  private async requireExisting(
    tx: Prisma.TransactionClient,
    clerkId: string,
  ): Promise<PrismaUser> {
    const user = await tx.user.findUnique({ where: { clerkId } });
    if (!user) this.fail(status.NOT_FOUND, 'User not found');
    return user;
  }

  private isDuplicateEvent(error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
  }

  private fail(code: status, message: string): never {
    throw new RpcException({ code, message });
  }
}
