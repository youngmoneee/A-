import { UserDto } from './user.dto';
import { DeviceDto } from './device.dto';

export class UserDetailDto extends UserDto {
  userEmail?: string;
  userImage?: string;
  devices?: DeviceDto[];
}
