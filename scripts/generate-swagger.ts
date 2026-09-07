import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../apps/api-gateway/src/app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('Microservice E-Commerce REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  fs.writeFileSync('/tmp/openapi.json', JSON.stringify(document, null, 2));
  console.log('Swagger spec generated at /tmp/openapi.json');
  process.exit(0);
}
bootstrap();
