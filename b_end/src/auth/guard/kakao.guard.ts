import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OauthProvider } from '../../dto/enum.provider';

@Injectable()
export class KakaoGuard extends AuthGuard(OauthProvider.KAKAO) {}
