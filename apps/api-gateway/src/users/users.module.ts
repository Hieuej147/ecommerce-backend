import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { USERS_V1_PACKAGE_NAME } from '@app/contracts/generated/users';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { AdminUsersController, UsersController } from './users.controller';
import { UsersGrpcService } from './users.grpc.service';
import { UsersService } from './users.service';
import { InngestModule } from '../inngest/inngest.module';

@Module({
  imports: [
    InngestModule,
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'USERS_GRPC',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: USERS_V1_PACKAGE_NAME,
            protoPath: join(process.cwd(), 'proto/users.proto'),
            url: config.get<string>('USERS_GRPC_URL') ?? 'localhost:5004',
            loader: { includeDirs: [join(process.cwd(), 'proto')] },
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController, AdminUsersController, ClerkWebhookController],
  providers: [UsersGrpcService, UsersService],
  exports: [UsersGrpcService],
})
export class UsersModule {}
