import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { validateAgentEnv } from './config/env';
import { AgentThreadsController } from './threads/agent-threads.controller';
import { AgentRuntimeController } from './runtime/agent-runtime.controller';
import { AgentRuntimeService } from './runtime/agent-runtime.service';
import { AgentRequestContextService } from './context/agent-request-context.service';
import { AgentPrismaService } from './persistence/agent-prisma.service';
import { AgentThreadStore } from './threads/agent-thread.store';
import { AgentEventStore, PrismaEventStore } from './events/agent-event.store';
import { PersistedAgentRunner } from './runner/persisted-agent.runner';
import { runCoordinatorProvider } from './coordination/run-coordinator.provider';
import { InternalAuthGuard } from './internal-auth/internal-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateAgentEnv,
    }),
  ],
  controllers: [AgentThreadsController, AgentRuntimeController],
  providers: [
    AgentRequestContextService,
    AgentPrismaService,
    AgentThreadStore,
    PrismaEventStore,
    { provide: AgentEventStore, useExisting: PrismaEventStore },
    PersistedAgentRunner,
    AgentRuntimeService,
    runCoordinatorProvider,
    { provide: APP_GUARD, useClass: InternalAuthGuard },
  ],
})
export class AgentModule {}
