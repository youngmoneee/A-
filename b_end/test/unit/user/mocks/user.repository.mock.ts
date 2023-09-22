import { UserDto } from '../../../../src/dto/user.dto';
import { ROLE } from '../../../../src/dto/enum.role';
import { CreateUserDto } from '../../../../src/dto/createUserDto';
import { OauthProvider } from '../../../../src/dto/enum.provider';
import { UserDetailDto } from '../../../../src/dto/userDetail.dto';
import { ConflictException } from '@nestjs/common';

const mockDb: CreateUserDto[] = [
  {
    userId: 'kakao',
    userName: 'kakao-tester',
    userRole: ROLE.USER,
    provider: OauthProvider.KAKAO,
    userEmail: 'qq@zz.com',
    userImage: 'qqasd.jpg',
  },
  {
    userId: 'google',
    userName: 'google-tester',
    userRole: ROLE.USER,
    provider: OauthProvider.GOOGLE,
    userEmail: 'qqq@zzz.com',
    userImage: 'qqasdasd.jpg',
  },
];
export const mockUserRepository = {
  findUserById: jest.fn().mockImplementation(async (id) => {
    return mockDb
      .map(
        (user, id) =>
          ({
            id,
            userName: user.userName,
            userRole: user.userRole,
          } as UserDto),
      )
      .find((user) => user.id === id);
  }),
  findUserDetailById: jest.fn().mockImplementation(async (id) => {
    const user = mockDb.find((user, idx) => idx === id);
    if (!user) return null;
    return {
      id,
      userName: user.userName,
      userRole: user.userRole,
      userEmail: user.userEmail,
      userImage: user.userImage,
    } as UserDetailDto;
  }),
  findUserByProvideId: jest
    .fn()
    .mockImplementation(async (userId, provider) => {
      const index = mockDb.findIndex(
        (user) => user.userId === userId && user.provider === provider,
      );
      if (index === -1) return null;
      return {
        id: index,
        userName: mockDb[index].userName,
        userRole: mockDb[index].userRole,
      } as UserDto;
    }),
  createUser: jest.fn().mockImplementation(async (data: CreateUserDto) => {
    if (
      mockDb.find(
        (user) =>
          user.provider === data.provider && user.userId === data.userId,
      )
    )
      throw new ConflictException();
    mockDb.push(data);
    return {
      id: mockDb.length - 1,
      userName: data.userName,
      userRole: data.userRole,
    } as UserDto;
  }),
  findAllAdmin: jest.fn().mockImplementation(async () => {
    return mockDb
      .map(
        (user, idx) =>
          ({
            id: idx,
            userName: user.userName,
            userRole: user.userRole,
          } as UserDto),
      )
      .filter((user) => user.userRole === ROLE.ADMIN);
  }),
};
