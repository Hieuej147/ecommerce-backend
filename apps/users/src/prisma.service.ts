import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    const pool = new Pool({
      connectionString: config.getOrThrow<string>('DATABASE_URL'),
    });

    super({
      adapter: new PrismaPg(pool),
    });
  }

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
