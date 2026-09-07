export interface ActorContext {
  userId: string;
  sessionId: string | null;
  orgId: string | null;
  orgRole: string | null;
  orgSlug: string | null;
  role: 'customer' | 'admin';
  requestId: string;
}

export type ActorRole = ActorContext['role'];

export interface ClerkActorClaims {
  userId: string | null;
  sessionId?: string | null;
  orgId?: string | null;
  orgRole?: string | null;
  orgSlug?: string | null;
  role?: string | null;
  requestId?: string;
}

export function toActorContext(auth: ClerkActorClaims): ActorContext {
  if (!auth.userId) {
    throw new Error('CurrentActor is only available on authenticated routes');
  }

  return {
    userId: auth.userId,
    sessionId: auth.sessionId ?? null,
    orgId: auth.orgId ?? null,
    orgRole: auth.orgRole ?? null,
    orgSlug: auth.orgSlug ?? null,
    role: auth.role === 'admin' ? 'admin' : 'customer',
    requestId: auth.requestId ?? randomUUID(),
  };
}
import { randomUUID } from 'crypto';
