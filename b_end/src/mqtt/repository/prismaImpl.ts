import { DeviceDto } from '../../dto/device.dto';
import { CreateDeviceDto } from '../../dto/createDeviceDto';
import { CreateRelationDto } from '../../dto/createRelationDto';
import { IDeviceRepository } from './interface';
import { PrismaService } from '../../prisma.service';
import {
  BadGatewayException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserDto } from '../../dto/user.dto';

const selectUser = {
  id: true,
  provider: true,
  userId: true,
  userName: true,
  userEmail: true,
  userImage: true,
  userRole: true,
};

@Injectable()
export class DevicePrismaImpl implements IDeviceRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(): Promise<DeviceDto[]> {
    return await this.prismaService.device
      .findMany()
      .then((devices) => {
        return devices.map((device) => {
          return {
            id: device.id,
            name: device.name,
            adminId: device.adminId,
          } as DeviceDto;
        });
      })
      .catch(() => {
        throw new BadGatewayException();
      });
  }
  async findDeviceById(id: number): Promise<DeviceDto> {
    return await this.prismaService.device
      .findFirst({
        where: {
          id,
        },
      })
      .then((device) => {
        return {
          id: device.id,
          name: device.name,
          adminId: device.adminId,
        };
      })
      .catch(() => {
        throw new BadGatewayException();
      });
  }

  async findDeviceByName(name: string): Promise<DeviceDto> {
    return await this.prismaService.device
      .findFirst({
        where: { name },
      })
      .then((device) => {
        if (!device) return null;
        return {
          id: device.id,
          name: device.name,
          adminId: device.adminId,
        } as DeviceDto;
      })
      .catch(() => {
        throw new BadGatewayException();
      });
  }
  async findDevicesByUserId(userId: number): Promise<DeviceDto[]> {
    return await this.prismaService.userDevice
      .findMany({
        where: { userId },
        include: { device: true },
      })
      .then((rs) => {
        return rs.map((item) => {
          return {
            id: item.device.id,
            name: item.device.name,
            adminId: item.device.adminId,
          } as DeviceDto;
        });
      })
      .catch(() => {
        throw new BadGatewayException();
      });
  }
  async findUsersByDeviceId(deviceId: number): Promise<UserDto[]> {
    return await this.prismaService.device
      .findFirst({
        where: { id: deviceId },
        include: {
          userDevices: {
            select: {
              user: {
                select: selectUser,
              },
            },
          },
        },
      })
      .then((device) => {
        return device.userDevices.map((userDevice) => {
          return userDevice.user as UserDto;
        });
      })
      .catch(() => {
        throw new BadGatewayException();
      });
  }

  async createDevice(data: CreateDeviceDto): Promise<DeviceDto> {
    return this.prismaService.device
      .create({ data })
      .then((device) => {
        return {
          id: device.id,
          name: device.name,
          adminId: device.adminId,
        } as DeviceDto;
      })
      .catch((e) => {
        if (e.code === 'P2002') throw new ConflictException();
        else throw new BadGatewayException();
      });
  }
  async createRelation(data: CreateRelationDto): Promise<boolean> {
    return await this.prismaService.userDevice
      .create({ data })
      .then(() => true)
      .catch((e) => {
        if (e.code === 'P2002') throw new ConflictException();
        else throw new BadGatewayException();
      });
  }
  async deleteRelation(data: CreateRelationDto): Promise<boolean> {
    return await this.prismaService.userDevice
      .deleteMany({
        where: data,
      })
      .then(() => true)
      .catch(() => false);
  }
}
