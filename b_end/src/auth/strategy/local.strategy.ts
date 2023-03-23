import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../dto/user.dto';
import { OauthProvider } from '../../dto/enum.provider';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //  토큰 추출
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    /*
    const user: UserDto = {
      provider: OauthProvider.LOCAL,
      userId: profile.id,
      userName: profile.displayName,
      userEmail: profile.emails[0].value,
      userImage: profile.photos[0].value,
    };*/
    return payload;
  }
}
