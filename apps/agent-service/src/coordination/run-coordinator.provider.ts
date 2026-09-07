import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { InMemoryRunCoordinator } from '../../../../libs/thread-manager/src/in-memory-run-coordinator';
import {
  RedisRunCoordinator,
  type RedisConnection,
} from '../../../../libs/thread-manager/src/redis-run-coordinator';

export const RUN_COORDINATOR = Symbol('RUN_COORDINATOR');

/**
 * Postgres is the event source of truth. Redis is only used for the
 * cross-instance lock/pub-sub required by a live runner. Memory is an
 * explicit local/test fallback, never an implicit production fallback.
 */
export function createRunCoordinator(config: ConfigService) {
  const redisUrl = config.get<string>('REDIS_URL');
  if (!redisUrl) {
    if (config.get<string>('NODE_ENV') === 'production') {
      throw new Error(
        'REDIS_URL is required in production when the thread runner is enabled',
      );
    }
    return new InMemoryRunCoordinator();
  }
  const client = new Redis(redisUrl, {
    lazyConnect: true,
    maxRetriesPerRequest: 2,
  });
  return new RedisRunCoordinator(client as unknown as RedisConnection);
}

export const runCoordinatorProvider = {
  provide: RUN_COORDINATOR,
  inject: [ConfigService],
  useFactory: createRunCoordinator,
};
