import { OauthProvider } from './enum.provider';

export class UserDto {
  provider: OauthProvider;
  userId: string;
  userName: string;
  userEmail?: string;
  userImage?: string;
}
