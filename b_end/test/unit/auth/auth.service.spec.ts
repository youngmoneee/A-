import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '../../../src/dto/enum.role';
import { OauthRepository } from '../../../src/auth/repository/OauthRepository';
import { mockOauthRepository } from './mocks/oauthRepository.mock';
import { mockJwtService } from './mocks/jwtSevice.mock';
import { OauthProvider } from '../../../src/dto/enum.provider';
import { BadGatewayException, ConflictException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { mockHttpRepository } from './mocks/httpRepository.mock';
import { mockUserRepository } from '../user/mocks/user.repository.mock';

describe('Auth Service Test', () => {
  let authService: AuthService;
  const mockConfigService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'Repository', useValue: mockUserRepository },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: OauthRepository, useValue: mockOauthRepository },
        { provide: HttpService, useValue: mockHttpRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
  it('AuthService 생성 테스트', () => {
    expect(authService).toBeDefined();
  });

  describe('userVerify Test', () => {
    it('유저 존재 O -> return true', async () => {
      expect(
        await authService.userVerify({
          id: 1,
          userName: 'trueman',
          userRole: ROLE.USER,
        }),
      ).toBe(true);
    });
    it('유저 존재 X -> return false', async () => {
      expect(
        await authService.userVerify({
          id: 3,
          userRole: ROLE.USER,
          userName: 'falseman',
        }),
      ).toBe(false);
    });
  });

  describe('Kakao에서 유저 정보 받아오기', () => {
    it('불러온 유저가 존재할 시, 기존 정보 반환', async () => {
      expect(await authService.getUserFromKakao('exist')).toEqual({
        id: 2,
        userName: 'exist',
        userRole: ROLE.USER,
      });
    });
    it('불러온 유저가 존재하지 않을 시, 저장 후 반환', async () => {
      mockOauthRepository.getUserFromKakao.mockResolvedValueOnce({
        userId: 'not-exist',
        provider: OauthProvider.KAKAO,
        userName: 'New-User',
        userImage: 'test-image',
        userEmail: 'qwe@asd.com',
        userRole: ROLE.USER,
      });
      mockUserRepository.findUserByProvideId.mockResolvedValueOnce(null);
      expect(await authService.getUserFromKakao('not-exist')).toEqual({
        id: 3,
        userName: 'New-User',
        userRole: ROLE.USER,
      });
    });
    describe('예외 테스트', () => {
      it('Kakao API Post 요청 실패 시 502 반환', async () => {
        mockHttpRepository.post.mockRejectedValueOnce(new Error('Post Error'));
        await expect(authService.getUserFromKakao('fail')).rejects.toThrow(
          BadGatewayException,
        );
      });
      it('Kakao API Get 요청 실패 시 502 반환', async () => {
        mockHttpRepository.get.mockRejectedValueOnce(new Error('Get Error'));
        await expect(authService.getUserFromKakao('fail')).rejects.toThrow(
          BadGatewayException,
        );
      });
      it('존재하는 유저 저장 시도 시 409 반환', async () => {
        await expect(
          mockUserRepository.createUser({
            userId: 'kakao',
            userName: 'kakao-tester',
            userRole: ROLE.USER,
            provider: OauthProvider.KAKAO,
            userEmail: 'qq@zz.com',
            userImage: 'qqasd.jpg',
          }),
        ).rejects.toThrow(ConflictException);
      });
    });
  });

  describe('Google에서 유저 정보 받아오기', () => {
    it('불러온 유저가 존재할 시, 기존 정보 반환', async () => {
      expect(await authService.getUserFromGoogle('exist')).toEqual({
        id: 2,
        userName: 'exist',
        userRole: ROLE.USER,
      });
    });
    it('불러온 유저가 존재하지 않을 시, 저장 후 반환', async () => {
      mockOauthRepository.getUserFromGoogle.mockResolvedValueOnce({
        userId: 'not-exist',
        provider: OauthProvider.GOOGLE,
        userName: 'New-User',
        userImage: 'test-image',
        userEmail: 'qwe@asd.com',
        userRole: ROLE.USER,
      });
      mockUserRepository.findUserByProvideId.mockResolvedValueOnce(null);
      expect(await authService.getUserFromGoogle('not-exist')).toEqual({
        id: 4,
        userName: 'New-User',
        userRole: ROLE.USER,
      });
    });
    describe('예외 테스트', () => {
      it('Google API Post 요청 실패 시 502 반환', async () => {
        mockHttpRepository.post.mockRejectedValueOnce(new Error('Post Error'));
        await expect(authService.getUserFromGoogle('fail')).rejects.toThrow(
          BadGatewayException,
        );
      });
      it('Google API Get 요청 실패 시 502 반환', async () => {
        mockHttpRepository.get.mockRejectedValueOnce(new Error('Get Error'));
        await expect(authService.getUserFromGoogle('fail')).rejects.toThrow(
          BadGatewayException,
        );
      });
      it('존재하는 유저 저장 시도 시 409 반환', async () => {
        await expect(
          mockUserRepository.createUser({
            userId: 'google',
            userName: 'google-tester',
            userRole: ROLE.USER,
            provider: OauthProvider.GOOGLE,
            userEmail: 'qqq@zzz.com',
            userImage: 'qqasdasd.jpg',
          }),
        ).rejects.toThrow(ConflictException);
      });
    });
  });
});
