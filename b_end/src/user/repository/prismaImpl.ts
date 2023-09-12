import { BadGatewayException, Injectable } from '@nestjs/common';
import { IUserRepository } from './interface';
import { UserDetailDto } from '../../dto/userDetail.dto';
import { UserDto } from '../../dto/user.dto';
import { PrismaService } from '../../prisma.service';
import { ROLE } from '../../dto/enum.role';
import { OauthProvider } from '../../dto/enum.provider';
import { CreateUserDto } from '../../dto/createUserDto';

@Injectable()
export class UserPrismaImpl implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findUserDetailById(id: number): Promise<UserDetailDto> {
    return await this.prismaService.user
      .findFirst({
        where: { id },
        include: {
          userDevices: {
            include: { device: true },
          },
        },
      })
      .then((user) => {
        return {
          id: user.id,
          userRole: ROLE[user.userRole],
          userName: user.userName,
          userEmail: user.userEmail,
          userImage: user.userImage,
          devices: user.userDevices.map((device) => device.device.name),
        } as UserDetailDto;
      })
      .catch(() => {
        throw new BadGatewayException();
      });
  }
  async updateUserDetail(
    id: number,
    data: UserDetailDto,
  ): Promise<UserDetailDto> {
    return await this.prismaService.user
      .update({
        where: { id },
        data: {
          userName: data.userName,
          userEmail: data.userEmail,
          userImage: data.userImage,
        },
      })
      .then((user) => {
        return {
          id,
          userName: user.userName,
          userImage: user.userImage,
          userEmail: user.userEmail,
        } as UserDetailDto;
      })
      .catch(() => {
        throw new BadGatewayException();
      });
  }
  async findAllAdmin(): Promise<UserDto[]> {
    return await this.prismaService.user
      .findMany({
        where: { userRole: ROLE.ADMIN },
      })
      .then((users) => users.map((user) => user as UserDto))
      .catch(() => {
        throw new BadGatewayException();
      });
  }
  async findUserById(id: number): Promise<UserDto> {
    return await this.prismaService.user
      .findFirst({
        where: { id },
      })
      .then((user) => {
        if (!user) return null;
        return {
          id: user.id,
          userName: user.userName,
          userRole: user.userRole,
        } as UserDto;
      })
      .catch(() => null);
  }

  async findUserByProvideId(
    id: string,
    provider: OauthProvider,
  ): Promise<UserDto> {
    return await this.prismaService.user
      .findFirst({
        where: {
          userId: id,
          provider,
        },
      })
      .then((user) => {
        if (!user) return null;
        return {
          id: user.id,
          userName: user.userName,
          userRole: user.userRole,
        } as UserDto;
      })
      .catch(() => null);
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    return await this.prismaService.user
      .create({
        data,
      })
      .then((user) => {
        if (!user) return null;
        return {
          id: user.id,
          userName: user.userName,
          userRole: user.userRole,
        } as UserDto;
      })
      .catch(() => null);
  }
}
