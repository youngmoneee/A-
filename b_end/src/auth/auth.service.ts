import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OauthProvider } from '../dto/enum.provider';
import { ROLE } from '../dto/enum.role';
import { IUserRepository } from '../user/repository/interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject('Repository') private readonly repository: IUserRepository,
    private readonly httpService: HttpService,
  ) {}

  async userVerify(user: UserDto): Promise<boolean> {
    if (!(await this.repository.findUserById(user.id))) return false;
    return true;
  }

  async getTokenFromKakao(code: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get('K_CLIENT_ID'),
          client_secret: this.configService.get('K_SECRET'),
          redirect_uri: this.configService.get('K_CALLBACK'),
          code: code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      ),
    );
    return response.data.access_token;
  }

  async getUserFromKakao(token: string): Promise<UserDto> {
    const response = await firstValueFrom(
      this.httpService.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }),
    );
    const userData = await this.repository.findUserByProvideId(
      response.data.id.toString(),
      OauthProvider.KAKAO,
    );
    if (!userData) {
      return await this.repository.createUser({
        provider: OauthProvider.KAKAO,
        userId: response.data.id.toString(),
        userName: response.data.kakao_account?.profile?.nickname,
        userEmail: response.data.kakao_account?.email,
        userImage: response.data.kakao_account?.profile?.profile_image_url,
        userRole: ROLE.USER,
      });
    }
    return userData;
  }
  async getTokenFromGoogle(code: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.post(
        'https://oauth2.googleapis.com/token',
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get('G_CLIENT_ID'),
          client_secret: this.configService.get('G_SECRET'),
          redirect_uri: this.configService.get('G_CALLBACK'),
          code: code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      ),
    );
    return response.data.access_token;
  }
  async getUserFromGoogle(token: string): Promise<UserDto> {
    const response = await firstValueFrom(
      this.httpService.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    const userData = await this.repository.findUserByProvideId(
      response.data.sub,
      OauthProvider.GOOGLE,
    );
    if (!userData) {
      return await this.repository.createUser({
        provider: OauthProvider.GOOGLE,
        userId: response.data.sub,
        userName: response.data.name,
        userEmail: response.data.email,
        userImage: response.data.picture,
        userRole: ROLE.USER,
      });
    }
    return userData;
  }
}
