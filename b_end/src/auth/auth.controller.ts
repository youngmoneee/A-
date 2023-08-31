import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from '../user/user.decorator';
import { UserDto } from '../dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiBearerAuth('accessToken')
  @ApiOperation({
    summary: '유저 인증 여부 확인',
    description:
      '유저가 정상적으로 토큰을 보냈다면 토큰 검증을 통해 유저의 정보를 응답함',
  })
  @ApiOkResponse({
    description: '유저 정보 반환',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: '인증되지 않은 클라이언트의 요청 시 401 반환',
  })
  @Get()
  @UseGuards(JwtGuard)
  getUser(@GetUser() user: UserDto) {
    return user;
  }

  @ApiOperation({
    summary: '카카오 로그인',
    description:
      '인증 서버로부터 Access Token을 받기위한 Access Code를 받아, Jwt 응답',
  })
  @ApiUnauthorizedResponse({
    description: '인증 실패 시 401 반환',
  })
  @Post('kakao')
  async kakaoLogin(@Res() res, @Body('code') code) {
    try {
      const token = await this.authService.getTokenFromKakao(code);
      const user = await this.authService.getUserFromKakao(token);
      res.status(200).send(this.jwtService.sign(user));
    } catch (e) {
      this.logger.error(e);
      res.sendStatus(401);
    }
  }

  @ApiOperation({
    summary: '구글 로그인',
    description:
      '인증 서버로부터 Access Token을 받기위한 Access Code를 받아, Jwt 응답',
  })
  @ApiUnauthorizedResponse({
    description: '인증 실패 시 401 반환',
  })
  @ApiBody({
    description: 'Oauth 인증에 필요한 AccessCode를 바디를 통해 전달',
    schema: {
      properties: {
        code: { type: 'string' },
      },
    },
  })
  @Post('google')
  async googleLogin(@Res() res, @Body('code') code) {
    try {
      const token = await this.authService.getTokenFromGoogle(code);
      const user = await this.authService.getUserFromGoogle(token);
      res.status(200).send(this.jwtService.sign(user)).status(200);
    } catch (e) {
      this.logger.error(e);
      res.sendStatus(401).json('Login Failed');
    }
  }
}
