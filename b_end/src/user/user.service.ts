import { Inject, Injectable } from '@nestjs/common';
import { UserDetailDto } from '../dto/userDetail.dto';
import { UserDto } from '../dto/user.dto';
import { IUserRepository } from './repository/interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('Repository') private readonly repository: IUserRepository,
  ) {}

  async getUserDetailById(id: number): Promise<UserDetailDto> {
    return await this.repository.findUserDetailById(id);
  }

  async updateUserDetail(
    id: number,
    data: UserDetailDto,
  ): Promise<UserDetailDto> {
    return await this.repository.updateUserDetail(id, data);
  }

  async getAdmins(): Promise<UserDto[]> {
    return await this.repository.findAllAdmin();
  }
}
