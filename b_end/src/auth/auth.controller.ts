import {
  Controller,
  Get,
  Logger,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOAuth2,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from './guard/jwt.guard';
import { GetUser } from '../user/user.decorator';
import { KakaoGuard } from './guard/kakao.guard';
import { GoogleGuard } from './guard/google.guard';
import { UserDto } from '../dto/user.dto';
import { AuthInterceptor } from './auth.interceptor';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
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
    description: '인증되지 않은 요청 시 401 반환',
  })
  @Get()
  @UseGuards(JwtGuard)
  getUser(@GetUser() user: UserDto) {
    return user;
  }

  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 로그인 페이지로 이동',
  })
  @ApiUnauthorizedResponse({
    description: '인증 실패 시 401 반환',
  })
  @Get('kakao')
  @UseGuards(KakaoGuard)
  kakaoLogin(@Res() res) {
    return res.sendStatus(401);
  }

  @ApiOperation({
    summary: '카카오 로그인 콜백',
    description: '카카오 로그인 성공 시 쿠키(/)에 토큰 담아 /으로 이동',
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
  @ApiUnauthorizedResponse({
    description: '인증 실패 시 401 반환',
  })
  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin(@Res() res) {
    res.sendStatus(401);
  }

  @ApiOperation({
    summary: '구글 로그인 콜백',
    description: '구글 로그인 성공 시 쿠키(/)에 토큰 담아 /으로 이동',
  })
  @Get('google/cb')
  @UseGuards(GoogleGuard)
  @UseInterceptors(AuthInterceptor)
  googleCallback(@Res() res) {
    return res.redirect('/');
  }
}
