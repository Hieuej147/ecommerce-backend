import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../apps/api-gateway/src/app.module';
import * as fs from 'fs';
import * as path from 'path';

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
  const specJson = JSON.stringify(document, null, 2);
  fs.writeFileSync('/tmp/openapi.json', specJson);
  
  const storefrontPath = '/mnt/disk3/E-commerce/openapi.json';
  if (fs.existsSync(path.dirname(storefrontPath))) {
    fs.writeFileSync(storefrontPath, specJson);
    console.log(`Swagger spec written to ${storefrontPath}`);
  }
  console.log('Swagger spec generated at /tmp/openapi.json');
  process.exit(0);
}
bootstrap();
