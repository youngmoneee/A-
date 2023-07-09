import { UserDto } from './user.dto';

export class UserDetailDto extends UserDto {
  userEmail?: string;
  userImage?: string;
}
