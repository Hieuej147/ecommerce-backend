import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateUsersEnv } from './config/env';
import { PrismaService } from './prisma.service';
import { UsersGrpcController } from './users.grpc.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateUsersEnv,
    }),
  ],
  controllers: [UsersGrpcController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
