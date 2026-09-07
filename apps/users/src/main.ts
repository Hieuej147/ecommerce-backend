import 'dotenv/config';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USERS_V1_PACKAGE_NAME } from '@app/contracts/generated/users';
import { UsersModule } from './users.module';
import { validateUsersEnv } from './config/env';

async function bootstrap() {
  const config = validateUsersEnv(process.env);
  const url = config.USERS_GRPC_URL || '0.0.0.0:5004';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.GRPC,
      options: {
        package: USERS_V1_PACKAGE_NAME,
        protoPath: join(process.cwd(), 'proto/users.proto'),
        url: url,
        loader: { includeDirs: [join(process.cwd(), 'proto')] },
      },
    },
  );
  console.log(`users service running at ${url}`);
  await app.listen();
}

void bootstrap();
