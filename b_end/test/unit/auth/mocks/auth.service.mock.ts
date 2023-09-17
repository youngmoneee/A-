import { UserDto } from '../../../../src/dto/user.dto';
import { mockOauthRepository } from './oauthRepository.mock';
import { mockUserRepository } from '../../user/mocks/mockUserRepository';

export const mockAuthService = {
  userVerify: jest.fn().mockImplementation(async (user: UserDto) => {
    if (!(await mockUserRepository.findUserById(user.id))) return true;
    return false;
  }),
  getUserFromKakao: jest.fn().mockImplementation(async (code: string) => {
    const createUserDto = await mockOauthRepository.getUserFromKakao(code);
    const userDto: UserDto = await mockUserRepository.findUserByProvideId(
      createUserDto.userId,
      createUserDto.provider,
    );
    if (!userDto) return await mockUserRepository.createUser(createUserDto);
    return userDto;
  }),
  getUserFromGoogle: jest.fn().mockImplementation(async (code: string) => {
    const createUserDto = await mockOauthRepository.getUserFromGoogle(code);
    const userDto: UserDto = await mockUserRepository.findUserByProvideId(
      createUserDto.userId,
      createUserDto.provider,
    );
    if (!userDto) return await mockUserRepository.createUser(createUserDto);
    return userDto;
  }),
};
