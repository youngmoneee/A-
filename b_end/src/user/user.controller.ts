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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Users Info')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: '유저의 상세 정보를 반환',
  })
  @ApiOkResponse({
    description: '인증 성공 시, 유저의 상세 정보를 반환',
    type: UserDetailDto,
  })
  @ApiUnauthorizedResponse({
    description: '인증되지 않은 유저가 요청 시 401 반환',
  })
  @Get()
  async getMyInfo(@GetUser() user: UserDto): Promise<UserDetailDto> {
    return await this.getUser(user.id);
  }

  @ApiOperation({ description: '특정 유저의 상세 정보 반환' })
  @ApiOkResponse({
    description: 'userId가 :id인 유저의 상세 정보를 반환함',
    type: UserDetailDto,
  })
  @ApiUnauthorizedResponse({
    description: '인증되지 않은 유저가 요청 시 401 반환',
  })
  @ApiNotFoundResponse({
    description: '존재하지 않는 유저를 조회하려고 시도 시, 404 반환',
  })
  @ApiParam({
    name: 'id',
    description: '찾으려고 하는 유저의 id',
  })
  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserDetailDto> {
    try {
      return await this.userService.getUserDetailById(id);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
