import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ROLE } from '../../../src/dto/enum.role';
import { OauthRepository } from '../../../src/auth/repository/OauthRepository';
import { UserDto } from '../../../src/dto/user.dto';
import { CreateUserDto } from '../../../src/dto/createUserDto';
import { OauthProvider } from '../../../src/dto/enum.provider';

describe('Auth Service Test', () => {
  let authService: AuthService;
  const mockUserRepository = {
    findUserById: jest.fn(),
    findUserByProvideId: jest.fn(),
    createUser: jest.fn(),
  };
  const mockOauthRepository = {
    getUserFromKakao: jest.fn(),
    getUserFromGoogle: jest.fn(),
  };

  const mockUser: UserDto = {
    id: 1,
    userName: 'mockUser',
    userRole: ROLE.USER,
  };
  const kakaoCreateUser: CreateUserDto = {
    provider: OauthProvider.KAKAO,
    userId: 'kakao-id',
    userName: 'kakaoman',
    userEmail: 'zsh@duck.com',
    userImage: 'image',
    userRole: ROLE.USER,
  };
  const googleCreateUser: CreateUserDto = {
    provider: OauthProvider.GOOGLE,
    userId: 'google-id',
    userName: 'googleman',
    userEmail: 'zsh@duck.com',
    userImage: 'image',
    userRole: ROLE.USER,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'Repository', useValue: mockUserRepository },
        { provide: ConfigService, useValue: new ConfigService() },
        { provide: JwtService, useValue: new JwtService() },
        { provide: OauthRepository, useValue: mockOauthRepository },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    mockOauthRepository.getUserFromKakao.mockResolvedValue(kakaoCreateUser);
    mockOauthRepository.getUserFromGoogle.mockResolvedValue(googleCreateUser);

    mockUserRepository.findUserById.mockImplementation(async (id: number) => {
      if (id === 0) return Promise.resolve(null);
      return Promise.resolve({
        id: 1,
        userName: 'existman',
        userRole: ROLE.USER,
      });
    });
    mockUserRepository.createUser.mockImplementation(
      async (createUser: CreateUserDto) =>
        Promise.resolve({
          id: 1,
          userName: createUser.userName,
          userRole: createUser.userRole,
        }),
    );
  });
  it('AuthService 생성 테스트', () => {
    expect(authService).toBeDefined();
  });

  describe('userVerify Test', () => {
    afterEach(() => {
      mockUserRepository.findUserById.mockClear();
    });
    it('유저 존재 O -> return true', async () => {
      mockUserRepository.findUserById.mockResolvedValueOnce(mockUser);
      expect(await authService.userVerify(mockUser)).toBe(true);
      expect(mockUserRepository.findUserById).toHaveBeenCalledTimes(1);
    });
    it('유저 존재 X -> return false', async () => {
      mockUserRepository.findUserById.mockResolvedValueOnce(null);
      expect(
        await authService.userVerify({
          id: 2,
          userRole: ROLE.USER,
          userName: 'falseman',
        }),
      ).toBe(false);
      expect(mockUserRepository.findUserById).toHaveBeenCalledTimes(1);
    });
  });

  describe('Kakao에서 유저 정보 받아오기', () => {
    afterEach(() => {
      mockOauthRepository.getUserFromKakao.mockClear();
      mockUserRepository.findUserByProvideId.mockClear();
      mockUserRepository.createUser.mockClear();
    });
    it('불러온 유저가 존재할 시, 기존 정보 반환', async () => {
      mockUserRepository.findUserByProvideId.mockResolvedValueOnce({
        id: 1,
        userName: 'existman',
        userRole: ROLE.USER,
      } as UserDto);
      expect(await authService.getUserFromKakao('exist')).toEqual({
        id: 1,
        userName: 'existman',
        userRole: ROLE.USER,
      });
      expect(mockOauthRepository.getUserFromKakao).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findUserByProvideId).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.createUser).toHaveBeenCalledTimes(0);
    });
    it('불러온 유저가 존재하지 않을 시, 저장 후 반환', async () => {
      mockUserRepository.findUserByProvideId.mockResolvedValueOnce(null);
      expect(await authService.getUserFromKakao('not-exist')).toEqual(
        await mockUserRepository.createUser(kakaoCreateUser),
      );
      expect(mockOauthRepository.getUserFromKakao).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findUserByProvideId).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.createUser).toHaveBeenCalledTimes(2);
    });
  });

  describe('Google에서 유저 정보 받아오기', () => {
    afterEach(() => {
      mockOauthRepository.getUserFromGoogle.mockClear();
      mockUserRepository.findUserByProvideId.mockClear();
      mockUserRepository.createUser.mockClear();
    });
    it('불러온 유저가 존재할 시, 기존 정보 반환', async () => {
      mockUserRepository.findUserByProvideId.mockResolvedValueOnce({
        id: 1,
        userName: 'existman',
        userRole: ROLE.USER,
      } as UserDto);
      expect(await authService.getUserFromGoogle('exist')).toEqual({
        id: 1,
        userName: 'existman',
        userRole: ROLE.USER,
      });
    });
    it('불러온 유저가 존재하지 않을 시, 저장 후 반환', async () => {
      mockUserRepository.findUserByProvideId.mockResolvedValueOnce(null);
      expect(await authService.getUserFromGoogle('not-exist')).toEqual(
        await mockUserRepository.createUser(googleCreateUser),
      );
      expect(mockOauthRepository.getUserFromGoogle).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findUserByProvideId).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.createUser).toHaveBeenCalledTimes(2);
    });
  });
});
