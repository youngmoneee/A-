import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { OauthProvider } from '../dto/enum.provider';
import { UserDetailDto } from '../dto/userDetail.dto';
import { UserDto } from '../dto/user.dto';
import { ROLE } from '../dto/enum.role';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<UserDto> {
    const user: User = await this.prisma.user.create({
      data,
    });
    return {
      id: user.id,
      userRole: user.userRole,
      userName: user.userName,
    } as UserDto;
  }

  async getUserByCB(
    userId: string,
    provider: OauthProvider,
  ): Promise<UserDto | null> {
    const user: User = await this.prisma.user.findFirst({
      where: { userId, provider },
    });
    return {
      id: user.id,
      userRole: user.userRole,
      userName: user.userName,
    } as UserDto;
  }

  async getUserDetailById(id: number): Promise<UserDetailDto> {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { id },
    });
    return {
      id: user.id,
      userRole: ROLE[user.userRole],
      userName: user.userName,
      userEmail: user.userEmail,
      userImage: user.userImage,
    } as UserDetailDto;
  }

  async updateUserDetail(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<UserDetailDto> {
    const user: User = await this.prisma.user.update({
      where: { id },
      data,
    });
    return {
      id,
      userRole: ROLE[user.userRole],
      userName: user.userName,
      userImage: user.userImage,
      userEmail: user.userEmail,
    } as UserDetailDto;
  }

  async deleteUserDetail(id: number): Promise<UserDetailDto> {
    const user: User = await this.prisma.user.delete({
      where: { id },
    });
    return {
      id,
      userRole: ROLE[user.userRole],
      userName: user.userName,
      userImage: user.userImage,
      userEmail: user.userEmail,
    } as UserDetailDto;
  }

  async getAdmins(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { userRole: ROLE.ADMIN },
    });
  }
}
