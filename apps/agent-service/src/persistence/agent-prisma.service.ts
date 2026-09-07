import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class AgentPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(config: ConfigService) {
    const pool = new Pool({
      connectionString: config.getOrThrow<string>('DATABASE_URL'),
      options: '-c search_path=agent_runtime',
    });
    super({ adapter: new PrismaPg(pool) });
  }

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
