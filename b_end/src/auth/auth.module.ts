import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from './guard/jwt.guard';
import { AuthInterceptor } from './auth.interceptor';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      strategies: [KakaoStrategy, GoogleStrategy, JwtStrategy],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), //  토큰 생성
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    KakaoStrategy,
    GoogleStrategy,
    JwtStrategy,
    JwtGuard,
    AuthInterceptor,
  ],
})
export class AuthModule {}
