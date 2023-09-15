import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../../dto/createUserDto';
import { OauthProvider } from '../../dto/enum.provider';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ROLE } from '../../dto/enum.role';

@Injectable()
export class OauthRepository {
  private readonly http: HttpService = new HttpService();

  constructor(private readonly config: ConfigService) {}

  /**
   * Authorization Code를 통해 Kakao로부터 토큰 획득
   * @param code
   */
  async getUserFromKakao(code: string): Promise<CreateUserDto> {
    try {
      const token = await firstValueFrom(
        this.http.post(
          'https://kauth.kakao.com/oauth/token',
          {
            grant_type: 'authorization_code',
            client_id: this.config.get('K_CLIENT_ID'),
            client_secret: this.config.get('K_SECRET'),
            redirect_uri: this.config.get('K_CALLBACK'),
            code: code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        ),
      ).then((res) => res.data.access_token);
      return await this.getDataFromKakao(token);
    } catch (e) {
      console.error(e);
      throw new BadGatewayException();
    }
  }

  /**
   * Authorization Code를 통해 Google로부터 토큰 획득
   * @param code
   */
  async getUserFromGoogle(code: string): Promise<CreateUserDto> {
    try {
      const token = await firstValueFrom(
        this.http.post(
          'https://oauth2.googleapis.com/token',
          {
            grant_type: 'authorization_code',
            client_id: this.config.get('G_CLIENT_ID'),
            client_secret: this.config.get('G_SECRET'),
            redirect_uri: this.config.get('G_CALLBACK'),
            code: code,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          },
        ),
      ).then((res) => res.data.access_token);
      return await this.getDataFromGoogle(token);
    } catch (e) {
      console.error(e);
      throw new BadGatewayException();
    }
  }

  /**
   * 토큰을 통해 Kakao로부터 유저의 정보 획득
   * @param token
   */
  private async getDataFromKakao(token: string): Promise<CreateUserDto> {
    const res = await firstValueFrom(
      this.http.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }),
    );
    return {
      provider: OauthProvider.KAKAO,
      userId: res.data.id.toString(),
      userName: res.data.kakao_account?.profile?.nickname,
      userEmail: res.data.kakao_account?.email,
      userImage: res.data.kakao_account?.profile?.profile_image_url,
      userRole: ROLE.USER,
    } as CreateUserDto;
  }
  private async getDataFromGoogle(token: string): Promise<CreateUserDto> {
    const res = await firstValueFrom(
      this.http.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );
    return {
      provider: OauthProvider.GOOGLE,
      userId: res.data.sub,
      userName: res.data.name,
      userEmail: res.data.email,
      userImage: res.data.picture,
      userRole: ROLE.USER,
    } as CreateUserDto;
  }
}
