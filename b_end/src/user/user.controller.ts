import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UserDetailDto } from '../dto/userDetail.dto';
import { GetUser } from './user.decorator';
import { UserDto } from '../dto/user.dto';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getMyInfo(@GetUser() user: UserDto): Promise<UserDetailDto> {
    return await this.getUser(user.id);
  }
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDetailDto> {
    try {
      return await this.userService.getUserDetailById(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
