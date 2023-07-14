import { ROLE } from './enum.role';

export class UserDto {
  id: number;
  userRole: ROLE;
  userName: string;
}
