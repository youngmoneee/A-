import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { ROLE } from '../../../src/dto/enum.role';

describe('Auth Service Test', () => {
  let authService: AuthService;
  const mockUserRepository = {
    findUserById: jest.fn(),
    findUserByProvideId: jest.fn(),
    createUser: jest.fn(),
  };
  const mockHttpService = {
    post: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'Repository', useValue: mockUserRepository },
        { provide: ConfigService, useValue: new ConfigService() },
        { provide: JwtService, useValue: new JwtService() },
        { provide: HttpService, useValue: new HttpService() },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('AuthService should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('userVerify Test', () => {
    it('return true if user verified', async () => {
      mockUserRepository.findUserById.mockResolvedValueOnce(true);
      expect(
        await authService.userVerify({
          id: 1,
          userRole: ROLE.USER,
          userName: 'test',
        }),
      ).toBe(true);
    });
  });
});
