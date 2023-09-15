import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from '../user/repository/interface';
import { OauthRepository } from './repository/OauthRepository';
import { CreateUserDto } from '../dto/createUserDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly oauthRepository: OauthRepository,
    @Inject('Repository') private readonly repository: IUserRepository,
  ) {}

  async userVerify(user: UserDto): Promise<boolean> {
    if (!(await this.repository.findUserById(user.id))) return false;
    return true;
  }

  async getUserFromKakao(code: string): Promise<UserDto> {
    const createUserDto: CreateUserDto =
      await this.oauthRepository.getUserFromKakao(code);
    const userDto: UserDto = await this.repository.findUserByProvideId(
      createUserDto.userId,
      createUserDto.provider,
    );
    if (!userDto) return await this.repository.createUser(createUserDto);
    return userDto;
  }

  async getUserFromGoogle(code: string): Promise<UserDto> {
    const createUserDto: CreateUserDto =
      await this.oauthRepository.getUserFromGoogle(code);
    const userDto: UserDto = await this.repository.findUserByProvideId(
      createUserDto.userId,
      createUserDto.provider,
    );
    if (!userDto) return await this.repository.createUser(createUserDto);
    return userDto;
  }
}
