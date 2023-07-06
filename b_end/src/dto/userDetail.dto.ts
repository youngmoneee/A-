import { OauthProvider } from './enum.provider';
import { ROLE } from './enum.role';
import { UserDto } from './user.dto';

export class UserDetailDto {
  userDto: UserDto;
  userEmail?: string;
  userImage?: string;
}
