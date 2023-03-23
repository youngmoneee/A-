import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'google',
      strategies: [KakaoStrategy, GoogleStrategy],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy, GoogleStrategy],
})
export class AuthModule {}
