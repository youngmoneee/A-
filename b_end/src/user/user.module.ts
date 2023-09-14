import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma.service';
import { UserPrismaImpl } from './repository/prismaImpl';

const Repository = {
  provide: 'Repository',
  useClass: UserPrismaImpl,
};
@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, Repository],
  exports: [Repository],
})
export class UserModule {}
