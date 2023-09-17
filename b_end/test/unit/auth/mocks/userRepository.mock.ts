import { UserDto } from '../../../../src/dto/user.dto';
import { ROLE } from '../../../../src/dto/enum.role';
import { CreateUserDto } from '../../../../src/dto/createUserDto';
import { OauthProvider } from '../../../../src/dto/enum.provider';

export const mockUsers: CreateUserDto[] = [
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
  findUserById: jest.fn().mockImplementation((id) => {
    const index = mockUsers.findIndex((user, idx) => idx === id);
    if (index === -1) return Promise.resolve(null);
    const user = mockUsers[index];
    return {
      id: index,
      userName: user.userName,
      userRole: user.userRole,
    } as UserDto;
  }),
  createUser: jest.fn().mockImplementation((user: CreateUserDto) => {
    mockUsers.push(user);
    return Promise.resolve({
      id: mockUsers.length - 1,
      userName: user.userName,
      userRole: user.userRole,
    } as UserDto);
  }),
  findUserByProvideId: jest.fn().mockImplementation((userId, provider) => {
    const index = mockUsers.findIndex(
      (user) => user.userId === userId && user.provider === provider,
    );
    if (index === -1) return Promise.resolve(null);
    return Promise.resolve({
      id: index,
      userName: mockUsers[index].userName,
      userRole: mockUsers[index].userRole,
    } as UserDto);
  }),
};
