import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { clerkMiddleware } from '@clerk/express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true, bodyParser: false });
  const config = app.get(ConfigService);

  app.use(
    json({
      limit: '50mb',
      verify: (req: any, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );
  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.setGlobalPrefix('v1');
  const authorizedParties = config
    .getOrThrow<string>('CLERK_AUTHORIZED_PARTIES')
    .split(',')
    .map((party) => party.trim())
    .filter(Boolean);

  app.enableCors({
    origin: authorizedParties,
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('Microservice E-Commerce REST API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    useGlobalPrefix: false,
    jsonDocumentUrl: '/openapi.json',
  });

  app.use(
    clerkMiddleware({
      publishableKey: config.getOrThrow<string>('CLERK_PUBLISHABLE_KEY'),
      secretKey: config.getOrThrow<string>('CLERK_SECRET_KEY'),
      jwtKey: config.getOrThrow<string>('CLERK_JWT_KEY'),
      authorizedParties,
    }),
  );
  await app.listen(config.getOrThrow<number>('PORT'));
}
void bootstrap();
