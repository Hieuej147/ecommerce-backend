import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ConversationThreadStatus, Prisma } from '../../generated/prisma';
import { AgentPrismaService } from '../persistence/agent-prisma.service';
import { AgentRequestContextService } from '../context/agent-request-context.service';

export type ThreadStatus = 'idle' | 'running' | 'deleting';
export interface ThreadMeta {
  id: string;
  agentId: string;
  title: string;
  status: ThreadStatus;
  archivedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

function map(row: {
  id: string;
  agentId: string;
  title: string;
  status: ConversationThreadStatus;
  archivedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}): ThreadMeta {
  return {
    id: row.id,
    agentId: row.agentId,
    title: row.title,
    status: row.status.toLowerCase() as ThreadStatus,
    archivedAt: row.archivedAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

@Injectable()
export class AgentThreadStore {
  constructor(
    private readonly prisma: AgentPrismaService,
    private readonly context: AgentRequestContextService,
  ) {}

  async create(agentId: string, threadId?: string): Promise<ThreadMeta> {
    const userId = this.context.require().userId;
    const id = threadId ?? randomUUID();
    const existing = await this.prisma.conversationThread.findUnique({
      where: { id },
    });
    if (existing) {
      if (existing.userId !== userId)
        throw new NotFoundException('Thread not found');
      return map(existing);
    }
    return map(
      await this.prisma.conversationThread.create({
        data: { id, userId, agentId },
      }),
    );
  }

  async get(threadId: string): Promise<ThreadMeta | null> {
    const row = await this.prisma.conversationThread.findFirst({
      where: { id: threadId, userId: this.context.require().userId },
    });
    return row ? map(row) : null;
  }

  async requireOwned(threadId: string) {
    const row = await this.prisma.conversationThread.findFirst({
      where: { id: threadId, userId: this.context.require().userId },
    });
    if (!row) throw new NotFoundException('Thread not found');
    return row;
  }

  async list(
    options: {
      agentId?: string;
      limit?: number;
      cursor?: string;
      includeArchived?: boolean;
    } = {},
  ) {
    const userId = this.context.require().userId;
    const limit = Math.min(Math.max(options.limit ?? 30, 1), 100);
    // Match the reference thread-manager contract: the default list is active
    // threads; includeArchived is a recovery view of archived threads only.
    const where: Prisma.ConversationThreadWhereInput = {
      userId,
      agentId: options.agentId,
      archivedAt: options.includeArchived ? { not: null } : null,
    };
    if (options.cursor) {
      const cursor = await this.prisma.conversationThread.findFirst({
        where: { id: options.cursor, userId },
        select: { id: true, updatedAt: true },
      });
      if (cursor)
        where.OR = [
          { updatedAt: { lt: cursor.updatedAt } },
          { updatedAt: cursor.updatedAt, id: { lt: cursor.id } },
        ];
    }
    const rows = await this.prisma.conversationThread.findMany({
      where,
      orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
    });
    return {
      threads: rows.slice(0, limit).map(map),
      nextCursor: rows.length > limit ? (rows[limit - 1]?.id ?? null) : null,
    };
  }

  async rename(threadId: string, title: string) {
    const row = await this.requireOwned(threadId);
    return map(
      await this.prisma.conversationThread.update({
        where: { id: row.id },
        data: { title: title.trim() || 'New conversation' },
      }),
    );
  }

  async renameIfTitle(threadId: string, expectedTitle: string, title: string) {
    const userId = this.context.require().userId;
    const result = await this.prisma.conversationThread.updateMany({
      where: { id: threadId, userId, title: expectedTitle },
      data: { title: title.trim() || 'New conversation' },
    });
    return result.count ? this.get(threadId) : null;
  }

  async touch(threadId: string) {
    const row = await this.requireOwned(threadId);
    return map(
      await this.prisma.conversationThread.update({
        where: { id: row.id },
        data: { updatedAt: new Date() },
      }),
    );
  }

  async setStatus(threadId: string, status: ThreadStatus) {
    const row = await this.requireOwned(threadId);
    return map(
      await this.prisma.conversationThread.update({
        where: { id: row.id },
        data: { status: status.toUpperCase() as ConversationThreadStatus },
      }),
    );
  }

  archive(threadId: string) {
    return this.requireOwned(threadId).then((row) =>
      this.prisma.conversationThread
        .update({
          where: { id: row.id },
          data: {
            archivedAt: new Date(),
            status: ConversationThreadStatus.IDLE,
          },
        })
        .then(map),
    );
  }
  unarchive(threadId: string) {
    return this.requireOwned(threadId).then((row) =>
      this.prisma.conversationThread
        .update({ where: { id: row.id }, data: { archivedAt: null } })
        .then(map),
    );
  }

  async delete(threadId: string): Promise<void> {
    await this.archive(threadId);
  }

  async listAll(
    options: {
      agentId?: string;
      limit?: number;
      cursor?: string;
      includeArchived?: boolean;
    } = {},
  ) {
    if (this.context.require().role !== 'admin') throw new NotFoundException();
    const limit = Math.min(Math.max(options.limit ?? 50, 1), 100);
    const rows = await this.prisma.conversationThread.findMany({
      where: {
        agentId: options.agentId,
        archivedAt: options.includeArchived ? { not: null } : null,
      },
      orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
      take: limit + 1,
    });
    return {
      threads: rows.slice(0, limit).map(map),
      nextCursor: rows.length > limit ? (rows[limit - 1]?.id ?? null) : null,
    };
  }

  async getAdmin(threadId: string) {
    if (this.context.require().role !== 'admin') throw new NotFoundException();
    const row = await this.prisma.conversationThread.findUnique({
      where: { id: threadId },
    });
    return row ? map(row) : null;
  }

  // Physical deletion is intentionally not part of the user-facing API. A
  // future retention job may call a separately protected maintenance service.
}
