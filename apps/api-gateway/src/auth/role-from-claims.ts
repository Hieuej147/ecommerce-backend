/**
 * Clerk only puts custom metadata into a session JWT when it is configured in
 * Dashboard → Sessions → Customize session token. Keep the parser tolerant of
 * the common claim names used by Clerk templates and older local tokens.
 */
import type { ActorRole } from './types/actor-context';

export function roleFromSessionClaims(
  claims: Record<string, unknown> | undefined,
): ActorRole {
  if (!claims) return 'customer';
  const metadataCandidates = [
    claims.metadata,
    claims.publicMetadata,
    claims.public_metadata,
    claims.user_metadata,
    claims.user,
  ];
  for (const candidate of metadataCandidates) {
    if (!candidate || typeof candidate !== 'object') continue;
    const record = candidate as Record<string, unknown>;
    const nested = record.publicMetadata ?? record.public_metadata ?? record.metadata ?? record;
    if (nested && typeof nested === 'object' && typeof (nested as Record<string, unknown>).role === 'string') {
      return (nested as Record<string, unknown>).role === 'admin'
        ? 'admin'
        : 'customer';
    }
  }
  if (claims.role === 'admin') return 'admin';
  if (claims['public_metadata.role'] === 'admin') return 'admin';
  return 'customer';
}
