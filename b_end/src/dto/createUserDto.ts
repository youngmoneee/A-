import { OauthProvider } from './enum.provider';
import { ROLE } from './enum.role';

export class CreateUserDto {
  provider: OauthProvider;
  userId: string;
  userName: string;
  userEmail: string;
  userImage: string;
  userRole: ROLE;
}
