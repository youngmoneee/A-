import { CreateUserDto } from '../../../../src/dto/createUserDto';
import { OauthProvider } from '../../../../src/dto/enum.provider';
import { ROLE } from '../../../../src/dto/enum.role';
import { mockHttpRepository } from './httpRepository.mock';
import { firstValueFrom } from 'rxjs';
import { BadGatewayException } from '@nestjs/common';

const mockCreateUser: CreateUserDto = {
  userId: 'test',
  provider: null,
  userName: 'exist',
  userImage: 'test-image',
  userEmail: 'qwe@asd.com',
  userRole: ROLE.USER,
};

export const mockOauthRepository = {
  getUserFromKakao: jest.fn().mockImplementation(async (code: unknown) => {
    try {
      // Get Access Token
      await mockHttpRepository.post();
      //  Get User Data
      await mockHttpRepository.get();
      const ret = mockCreateUser;
      ret.provider = OauthProvider.KAKAO;
      return ret;
    } catch (e) {
      throw new BadGatewayException();
    }
  }),
  getUserFromGoogle: jest.fn().mockImplementation(async (code: unknown) => {
    try {
      // Get Access Token
      await mockHttpRepository.post();
      //  Get User Data
      await mockHttpRepository.get();
      const ret = mockCreateUser;
      ret.provider = OauthProvider.GOOGLE;
      return ret;
    } catch (e) {
      throw new BadGatewayException();
    }
  }),
};
