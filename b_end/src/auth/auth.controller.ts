import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/token.decorator';
import { LocalJwtGuard } from './auth.guard';

@Controller('oauth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(LocalJwtGuard)
  getUser(@Req() req) {
    return req.headers;
  }

  @ApiOperation({
    summary: '로그인',
    description: '카카오 로그인 페이지로 이동',
  })
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {}

  @ApiOperation({
    summary: '카카오 로그인 콜백',
    description:
      '카카오 로그인 성공 시 해당 페이지로 리다이렉트 후, 메인으로 이동',
  })
  @Get('kakao/cb')
  @UseGuards(AuthGuard('kakao'))
  kakaoCallback(@Res() res, @GetUser() user) {
    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    const token = this.authService.generateToken(user);
    res.cookie(
      this.authService.getTokenId(),
      token,
      this.authService.getTokenOptions(),
    );
    return res.redirect('/');
  }

  @ApiOperation({
    summary: '로그인',
    description: '구글 로그인 페이지로 이동',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @ApiOperation({
    summary: '구글 로그인 콜백',
    description:
      '구글 로그인 성공 시 해당 페이지로 리다이렉트 후, 메인으로 이동',
  })
  @Get('google/cb')
  @UseGuards(AuthGuard('google'))
  googleCallback(@Res() res, @GetUser() user) {
    if (!user) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    const token = this.authService.generateToken(user);
    res.cookie(
      this.authService.getTokenId(),
      token,
      this.authService.getTokenOptions(),
    );
    return res.redirect('/');
  }
}
