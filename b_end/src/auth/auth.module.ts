import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './strategy/kakao.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'kakao',
      strategies: [KakaoStrategy],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy],
})
export class AuthModule {}
