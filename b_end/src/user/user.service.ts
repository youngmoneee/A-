import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { OauthProvider } from '../dto/enum.provider';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserByCB(
    userId: string,
    provider: OauthProvider,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { userId, provider },
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { id: id },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getAdmins(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { userRole: 'ADMIN' },
    });
  }
}
