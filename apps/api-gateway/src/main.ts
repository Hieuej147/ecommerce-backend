import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { clerkMiddleware } from '@clerk/express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: false,
  });
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
    .map((party) => party.replace(/\s+/g, ''))
    .filter(Boolean);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || authorizedParties.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Microservice E-Commerce API Gateway')
    .setDescription(
      'REST API Documentation for the Microservice E-Commerce Platform.\n\n' +
        '### 🔐 Authentication\n' +
        '- Endpoints tagged with Bearer Auth require a valid Clerk Session JWT.\n' +
        '- Pass header: `Authorization: Bearer <clerk_session_token>`.\n' +
        '- Admin routes additionally require the Clerk user to hold `role: "admin"` in publicMetadata.\n\n' +
        '### 💳 Checkout & Payments Workflow\n' +
        '1. Create order via `POST /v1/orders` (status: `PENDING_PAYMENT`).\n' +
        '2. Call `POST /v1/payments/checkout` with `orderId`, `successUrl`, `cancelUrl`.\n' +
        '3. Redirect customer to `checkoutUrl` returned by the server (Stripe Checkout).\n' +
        '4. Stripe processes payment and redirects back to `successUrl` or `cancelUrl`.\n' +
        '5. Backend receives webhook from Stripe, marks order `PAID`, and broadcasts event.\n\n' +
        '### ⚡ Idempotency\n' +
        '- `POST /v1/orders` and `POST /v1/payments/checkout` accept an optional `Idempotency-Key` header (UUID) to prevent double-charging or duplicate order creation on network failures.',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description:
          'Enter your Clerk JWT Bearer token: "Bearer <token>" or just the token',
        in: 'header',
      },
      'bearer',
    )
    .addTag('Products', 'Public and admin product catalog browsing and inventory management')
    .addTag('Orders', 'Order placement, customer order history, status updates, and admin metrics')
    .addTag('Payments', 'Stripe checkout session initiation, transaction lookup, and metrics')
    .addTag('Users', 'Current authenticated user profile and admin user management')
    .addTag('Notifications', 'In-app notifications feed, unread counters, and mark-as-read actions')
    .addTag('Media', 'Direct multipart image uploading and asset streaming with caching')
    .addTag('Admin / Overview', 'Consolidated store health, low-stock alerts, and financial overview')
    .addTag('Health', 'Gateway liveness and operational readiness checks')
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
