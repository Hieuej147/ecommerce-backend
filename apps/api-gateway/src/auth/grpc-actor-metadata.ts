import { Metadata } from '@grpc/grpc-js';
import type { ActorContext } from './types/actor-context';

export function createActorMetadata(actor: ActorContext): Metadata {
  const metadata = new Metadata();
  metadata.set('x-user-id', actor.userId);
  metadata.set('x-user-role', actor.role);
  if (actor.sessionId) metadata.set('x-session-id', actor.sessionId);
  if (actor.orgId) metadata.set('x-org-id', actor.orgId);
  metadata.set('x-request-id', actor.requestId);
  return metadata;
}
