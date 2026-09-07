import { Injectable } from '@nestjs/common';
import { clerkClient } from '@clerk/express';
import { status } from '@grpc/grpc-js';
import type { ActorContext } from '../auth/types/actor-context';
import { UsersGrpcService } from './users.grpc.service';

function isNotFound(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (error as { code?: unknown }).code === status.NOT_FOUND
  );
}

@Injectable()
export class UsersService {
  constructor(private readonly users: UsersGrpcService) {}

  async current(actor: ActorContext) {
    try {
      return await this.users.getByClerkId(actor.userId);
    } catch (error) {
      if (!isNotFound(error)) throw error;
    }

    const clerkUser = await clerkClient.users.getUser(actor.userId);
    const primaryEmail = clerkUser.emailAddresses.find(
      (email) => email.id === clerkUser.primaryEmailAddressId,
    );
    const displayName =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ').trim() ||
      clerkUser.username ||
      primaryEmail?.emailAddress ||
      clerkUser.id;
    const role = clerkUser.publicMetadata.role === 'admin' ? 'admin' : 'customer';

    return this.users.upsert({
      eventId: `lazy:${clerkUser.id}:${clerkUser.updatedAt}`,
      eventType: 'lazy.sync',
      clerkId: clerkUser.id,
      email: primaryEmail?.emailAddress ?? '',
      firstName: clerkUser.firstName ?? '',
      lastName: clerkUser.lastName ?? '',
      displayName,
      imageUrl: clerkUser.imageUrl,
      role,
      payloadJson: JSON.stringify({ source: 'clerk-backend-api' }),
      clerkCreatedAt: new Date(clerkUser.createdAt).toISOString(),
    });
  }
}
