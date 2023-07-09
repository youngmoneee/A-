import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../dto/user.dto';
import { OauthProvider } from '../../dto/enum.provider';
import { User } from '@prisma/client';
import { UserService } from '../../user/user.service';
import { ROLE } from '../../dto/enum.role';

@Injectable()
export class KakaoStrategy extends PassportStrategy(
  Strategy,
  OauthProvider.KAKAO,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
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
    const userDb: UserDto = await this.userService.getUserByCB(
      profile.id.toString(),
      OauthProvider.KAKAO,
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
      provider: OauthProvider.KAKAO,
      userId: profile.id.toString(),
      userName: profile.displayName,
      userEmail: profile._json.kakao_account.email,
      userImage: profile._json.properties.profile_image,
      userRole: ROLE.USER,
    });
    return done(null, {
      id: user.id,
      userRole: user.userRole,
      userName: user.userName,
    } as UserDto);
  }
}
