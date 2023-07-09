import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../dto/user.dto';
import { OauthProvider } from '../../dto/enum.provider';
import { UserService } from '../../user/user.service';
import { User } from '@prisma/client';
import { ROLE } from '../../dto/enum.role';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  OauthProvider.GOOGLE,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
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
    const userDb = await this.userService.getUserByCB(
      profile.id,
      OauthProvider.GOOGLE,
    );
    if (userDb) {
      const user: UserDto = {
        id: userDb.id,
        userRole: ROLE[userDb.userRole],
        userName: userDb.userName,
      };
      return done(null, user);
    }
    //  없으면 만들고 반환
    const user: UserDto = await this.userService.createUser({
      provider: OauthProvider.GOOGLE,
      userId: profile.id,
      userName: profile.displayName,
      userEmail: profile.emails[0].value,
      userImage: profile.photos[0].value,
      userRole: ROLE.USER,
    });
    return done(null, {
      id: user.id,
      userRole: user.userRole,
      userName: user.userName,
    } as UserDto);
  }
}
