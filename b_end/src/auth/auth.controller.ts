import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { GetUser } from '../user/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('oauth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    description: '카카오 로그인 페이지로 이동',
  })
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    this.logger.log('Login Failed');
  }

  @ApiOperation({
    summary: '카카오 로그인 콜백',
    description:
      '카카오 로그인 성공 시 해당 페이지로 리다이렉트 후, 메인으로 이동',
  })
  @Get('kakao/cb')
  @UseGuards(AuthGuard('kakao'))
  kakaoCallback(@GetUser() user: UserDto) {
    return user;
  }

  @ApiOperation({
    summary: '로그인',
    description: '구글 로그인 페이지로 이동',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    this.logger.log('Login Failed');
  }

  @ApiOperation({
    summary: '구글 로그인 콜백',
    description:
      '구글 로그인 성공 시 해당 페이지로 리다이렉트 후, 메인으로 이동',
  })
  @Get('google/cb')
  @UseGuards(AuthGuard('google'))
  googleCallback(@GetUser() user: UserDto) {
    return user;
  }
}
