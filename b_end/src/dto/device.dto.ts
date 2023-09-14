import { ApiProperty } from '@nestjs/swagger';

export class DeviceDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  adminId: number;
}
