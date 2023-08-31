import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDetailDto } from '../dto/userDetail.dto';
import { ROLE } from '../dto/enum.role';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserDetailById(id: number): Promise<UserDetailDto> {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { id },
        include: {
          userDevices: {
            include: {
              device: true,
            },
          },
        },
      });
      const deviceNames: string[] = user.userDevices.map(
        (device) => device.device.name,
      );
      return {
        id: user.id,
        userRole: ROLE[user.userRole],
        userName: user.userName,
        userEmail: user.userEmail,
        userImage: user.userImage,
        devices: deviceNames,
      } as UserDetailDto;
    } catch (e) {
      console.error(e);
    }
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
