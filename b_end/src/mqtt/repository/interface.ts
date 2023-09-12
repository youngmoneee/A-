import { DeviceDto } from '../../dto/device.dto';
import { CreateDeviceDto } from '../../dto/createDeviceDto';
import { CreateRelationDto } from '../../dto/createRelationDto';
import { UserDto } from '../../dto/user.dto';

export interface IDeviceRepository {
  findAll(): Promise<DeviceDto[]>;
  findDeviceById(id: number): Promise<DeviceDto>;
  findDeviceByName(name: string): Promise<DeviceDto>;
  findDevicesByUserId(userId: number): Promise<DeviceDto[]>;
  findUsersByDeviceId(deviceId: number): Promise<UserDto[]>;
  createDevice(data: CreateDeviceDto): Promise<DeviceDto>;
  createRelation(data: CreateRelationDto): Promise<boolean>;
  deleteRelation(data: CreateRelationDto): Promise<boolean>;
}
