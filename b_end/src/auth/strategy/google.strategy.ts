import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../dto/user.dto';
import { OauthProvider } from '../../dto/enum.provider';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get('G_CLIENT_ID'),
      clientSecret: configService.get('G_SECRET'),
      callbackURL: configService.get('G_CALLBACK'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: any,
  ) {
    const user: UserDto = {
      provider: OauthProvider.GOOGLE,
      userId: profile.id,
      userName: profile.displayName,
      userEmail: profile.emails[0].value,
      userImage: profile.photos[0].value,
    };
    return cb(null, user);
  }
}
