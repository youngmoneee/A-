import { UserDto } from './user.dto';

export class DeviceDto {
  id: number;
  name: string;
  adminId: number;
  user?: UserDto[];
}
