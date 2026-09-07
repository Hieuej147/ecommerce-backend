import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentProxyController } from './agent-proxy.controller';
import { AgentProxyService } from './agent-proxy.service';

@Module({
  imports: [ConfigModule],
  controllers: [AgentProxyController],
  providers: [AgentProxyService],
})
export class AgentModule {}
