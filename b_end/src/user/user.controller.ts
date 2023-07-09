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

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDetailDto> {
    try {
      return await this.userService.getUserDetailById(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
