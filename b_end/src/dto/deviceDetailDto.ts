import { DeviceDto } from './device.dto';
import { UserDto } from './user.dto';

export class DeviceDetailDto extends DeviceDto {
  users: UserDto[];
}
