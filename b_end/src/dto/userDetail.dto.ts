import { UserDto } from './user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDetailDto extends UserDto {
  @ApiProperty({ required: false })
  userEmail?: string;

  @ApiProperty({ required: false })
  userImage?: string;

  @ApiProperty({ required: false })
  devices?: string[];
}
