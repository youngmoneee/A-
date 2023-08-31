import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OauthProvider } from '../dto/enum.provider';
import { ROLE } from '../dto/enum.role';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async userVerify(user: UserDto): Promise<boolean> {
    const res = await this.prismaService.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!res) return false;
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
    const userData = await this.prismaService.user.findFirst({
      where: {
        userId: response.data.id.toString(),
        provider: OauthProvider.KAKAO,
      },
    });
    if (!userData) {
      const user = await this.prismaService.user.create({
        data: {
          provider: OauthProvider.KAKAO,
          userId: response.data.id.toString(),
          userName: response.data.kakao_account?.profile?.nickname,
          userEmail: response.data.kakao_account?.email,
          userImage: response.data.kakao_account?.profile?.profile_image_url,
          userRole: ROLE.USER,
        },
      });
      return {
        id: user.id,
        userRole: user.userRole,
        userName: user.userName,
      } as UserDto;
    }
    return {
      id: userData.id,
      userName: userData.userName,
      userRole: userData.userRole,
    } as UserDto;
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
    const userData = await this.prismaService.user.findFirst({
      where: {
        userId: response.data.sub,
        provider: OauthProvider.GOOGLE,
      },
    });
    if (!userData) {
      const user = await this.prismaService.user.create({
        data: {
          provider: OauthProvider.GOOGLE,
          userId: response.data.sub,
          userName: response.data.name,
          userEmail: response.data.email,
          userImage: response.data.picture,
          userRole: ROLE.USER,
        },
      });
      return {
        id: user.id,
        userRole: user.userRole,
        userName: user.userName,
      } as UserDto;
    }
    return {
      id: userData.id,
      userName: userData.userName,
      userRole: userData.userRole,
    } as UserDto;
  }
}
