import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

let globalPrisma: PrismaService | undefined;

export function getPrismaClient(): PrismaService {
  if (!globalPrisma) {
    globalPrisma = new PrismaService();
  }
  return globalPrisma;
}

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error('DATABASE_URL is required');
    const pool = new Pool({ connectionString });
    super({ adapter: new PrismaPg(pool) });
    if (!globalPrisma) {
      globalPrisma = this;
    }
  }

  async onModuleInit(): Promise<void> {
    if (process.env.NODE_ENV !== 'test') await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
