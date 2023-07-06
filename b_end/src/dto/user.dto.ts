import { OauthProvider } from './enum.provider';
import { ROLE } from './enum.role';

export class UserDto {
  userId: number;
  userRole: ROLE;
  provider: OauthProvider;
  userName: string;
}
