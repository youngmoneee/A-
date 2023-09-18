import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma.service';
import { mockPrismaService } from './mocks/prisma.service.mock';
import { mockUserRepository } from './mocks/user.repository.mock';
import { UserService } from '../../../src/user/user.service';
import { CreateUserDto } from '../../../src/dto/createUserDto';
import { OauthProvider } from '../../../src/dto/enum.provider';
import { ROLE } from '../../../src/dto/enum.role';

describe('User Service Test', () => {
  let userService: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: 'Repository', useValue: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('User Service 생성 테스트', () => {
    expect(userService).toBeDefined();
  });

  describe('유저 상세 정보 조회 테스트', () => {
    it('생성 후 조회 테스트', async () => {
      const createUserDto: CreateUserDto = {
        provider: OauthProvider.KAKAO,
        userId: 'test',
        userName: 'test',
        userRole: ROLE.USER,
        userImage: 'test-image',
        userEmail: 'test-email',
      };
      const newUser = await mockUserRepository.createUser(createUserDto);
      expect(
        await mockUserRepository
          .findUserDetailById(newUser.id)
          .then((user) => user.id),
      ).toEqual(newUser.id);
    });
    it('존재하지 않는 유저 조회 테스트', async () => {
      expect(await mockUserRepository.findUserDetailById(99999)).toBe(null);
    });
  });
});
