import { UserDto } from './user.dto';

export class CreateChatDto {
  user: UserDto;
  msg?: string;
  img?: Express.Multer.File[];
}
