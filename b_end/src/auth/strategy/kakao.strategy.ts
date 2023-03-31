import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../dto/user.dto';
import { OauthProvider } from '../../dto/enum.provider';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('K_CLIENT_ID'),
      clientSecret: configService.get('K_SECRET'), // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: configService.get('K_CALLBACK'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const user: UserDto = {
      provider: OauthProvider.KAKAO,
      userId: profile.id,
      userName: profile.displayName,
      userEmail: profile._json.kakao_account.email,
      userImage: profile._json.properties.profile_image,
    };
    return done(null, user);
  }
}
