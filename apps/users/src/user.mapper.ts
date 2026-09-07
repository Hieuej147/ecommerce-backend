import type { User as PrismaUser } from '../generated/prisma/client';
import type { User } from '@app/contracts/generated/users';

export function toProtoUser(user: PrismaUser): User {
  return {
    id: user.id,
    clerkId: user.clerkId,
    email: user.email ?? '',
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    displayName: user.displayName ?? '',
    imageUrl: user.imageUrl ?? '',
    role: user.role.toLowerCase(),
    status: user.status.toLowerCase(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
