import { ROLE } from './enum.role';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'AutoIncrement userId' })
  id: number;

  @ApiProperty()
  userRole: ROLE;
  @ApiProperty()
  userName: string;
}
