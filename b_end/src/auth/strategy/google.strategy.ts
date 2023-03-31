import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../dto/user.dto';
import { OauthProvider } from '../../dto/enum.provider';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
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
    done: any,
  ) {
    const user: UserDto = {
      provider: OauthProvider.GOOGLE,
      userId: profile.id,
      userName: profile.displayName,
      userEmail: profile.emails[0].value,
      userImage: profile.photos[0].value,
    };
    return done(null, user);
  }
}
