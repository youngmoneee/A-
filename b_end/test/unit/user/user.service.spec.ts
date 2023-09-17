import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma.service';
import { mockPrismaService } from './mocks/mockPrismaService';
import { mockUserRepository } from './mocks/mockUserRepository';
import { UserService } from '../../../src/user/user.service';

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
});
