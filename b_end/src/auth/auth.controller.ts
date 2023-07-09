import {
  Controller,
  Get,
  Logger,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from '../user/user.decorator';
import { KakaoGuard } from './guard/kakao.guard';
import { GoogleGuard } from './guard/google.guard';
import { UserDto } from '../dto/user.dto';
import { AuthInterceptor } from './auth.interceptor';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '유저 인증 여부 확인',
    description:
      '유저가 정상적으로 토큰을 보냈다면 토큰 검증을 통해 유저의 정보를 응답함',
  })
  @Get()
  @UseGuards(JwtGuard)
  getUser(@GetUser() user: UserDto) {
    return user;
  }

  @ApiOperation({
    summary: '로그인',
    description: '카카오 로그인 페이지로 이동',
  })
  @Get('kakao')
  @UseGuards(KakaoGuard)
  kakaoLogin(@Res() res) {
    return res.sendStatus(401);
  }

  @ApiOperation({
    summary: '카카오 로그인 콜백',
    description:
      '카카오 로그인 성공 시 해당 페이지로 리다이렉트 후, 메인으로 이동',
  })
  @Get('kakao/cb')
  @UseGuards(KakaoGuard)
  @UseInterceptors(AuthInterceptor)
  kakaoCallback(@Res() res) {
    return res.redirect('/');
  }

  @ApiOperation({
    summary: '로그인',
    description: '구글 로그인 페이지로 이동',
  })
  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin(@Res() res) {
    res.sendStatus(401);
  }

  @ApiOperation({
    summary: '구글 로그인 콜백',
    description:
      '구글 로그인 성공 시 해당 페이지로 리다이렉트 후, 메인으로 이동',
  })
  @Get('google/cb')
  @UseGuards(GoogleGuard)
  @UseInterceptors(AuthInterceptor)
  googleCallback(@Res() res) {
    return res.redirect('/');
  }
}
