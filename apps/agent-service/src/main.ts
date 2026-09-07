import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AgentModule } from './agent.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AgentModule, { bodyParser: false });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  const config = app.get(ConfigService);
  app.setGlobalPrefix('v1');
  await app.listen(config.getOrThrow<number>('AGENT_SERVICE_PORT'));
}

void bootstrap();
