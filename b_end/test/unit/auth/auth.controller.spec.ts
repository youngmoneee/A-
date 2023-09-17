import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../src/auth/auth.controller';
import { AuthService } from '../../../src/auth/auth.service';
import { mockJwtService } from './mocks/jwtSevice.mock';
import { mockOauthRepository } from './mocks/oauthRepository.mock';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OauthRepository } from '../../../src/auth/repository/OauthRepository';
import { mockAuthService } from './mocks/auth.service.mock';
import { UnauthorizedException } from '@nestjs/common';
import { mockUserRepository } from '../user/mocks/mockUserRepository';

describe('AuthController', () => {
  let controller: AuthController;
  const mockConfigService = {};
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: OauthRepository, useValue: mockOauthRepository },
        { provide: 'Repository', useValue: mockUserRepository },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('AuthController 생성 테스트', () => {
    expect(controller).toBeDefined();
  });
  describe('POST /auth/kakao 테스트', () => {
    it('성공 시 Response에 토큰 반환', async () => {
      const mockToken = 'success-token';
      mockJwtService.sign.mockReturnValue(mockToken);
      await controller.kakaoLogin(mockRes, 'test-code');
      expect(mockRes.send).toHaveBeenCalledWith(mockToken);
    });
    it('실패 시 401 Unauthorized throw', async () => {
      mockOauthRepository.getUserFromKakao.mockRejectedValueOnce(
        new Error('Kakao Error'),
      );
      await expect(controller.kakaoLogin(mockRes, null)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
  describe('POST /auth/google 테스트', () => {
    it('성공 시 Response에 토큰 반환', async () => {
      const mockToken = 'success-token';
      mockJwtService.sign.mockReturnValue(mockToken);
      await controller.googleLogin(mockRes, 'test-code');
      expect(mockRes.send).toHaveBeenCalledWith(mockToken);
    });
    it('실패 시 401 Unauthorized throw', async () => {
      mockOauthRepository.getUserFromGoogle.mockRejectedValueOnce(
        new Error('Google Error'),
      );
      await expect(controller.googleLogin(mockRes, null)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
