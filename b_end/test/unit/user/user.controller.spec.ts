import { UserController } from '../../../src/user/user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/user/user.service';
import { mockUserRepository } from './mocks/user.repository.mock';
import { PrismaService } from '../../../src/prisma.service';
import { mockPrismaService } from './mocks/prisma.service.mock';

describe('User Controller Test', () => {
  let controller: UserController;
  let service: UserService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: 'Repository', useValue: mockUserRepository },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('UserController 생성 테스트', () => {
    expect(controller).toBeDefined();
  });

  it('UserService 생성 테스트', () => {
    expect(service).toBeDefined();
  });

  describe('GetUser 테스트', () => {
    it('DB와 컨트롤러 요청 값 비교', async () => {
      const userDetail = await mockUserRepository.findUserDetailById(0);
      expect(await service.getUserDetailById(0)).toEqual(userDetail);
    });
    it('존재하지 않는 값에 대한 DB와 컨트롤러 요청 값 비교', async () => {
      const userDetail = await mockUserRepository.findUserDetailById(99999);
      expect(await service.getUserDetailById(99999)).toEqual(userDetail);
    });
  });
});
