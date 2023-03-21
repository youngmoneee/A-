import { Controller, Get, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('oauth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    description: '카카오 로그인 페이지로 이동',
  })
  @Get('kakao')
  kakaoLogin() {
    this.logger.log('Login Failed');
  }

  //@ApiOperation({
  //  summary: '카카오 로그인 콜백',
  //  description:
  //    '카카오 로그인 성공 시 해당 페이지로 리다이렉트 후, 메인으로 이동',
  //})
  //@Get('kakao/callback')
  //kakaoCallback(@GetUser() user: UserDto) {}
}
