import { UserDetailDto } from '../../dto/userDetail.dto';
import { UserDto } from '../../dto/user.dto';
import { OauthProvider } from '../../dto/enum.provider';
import { CreateUserDto } from '../../dto/createUserDto';

export interface IUserRepository {
  /**
   * Id를 통해 유저 정보 반환
   * @param id
   */
  findUserById(id: number): Promise<UserDto>;

  /**
   * Id를 통해 유저 상세 정보 반환
   * @param id
   */
  findUserDetailById(id: number): Promise<UserDetailDto>;

  /**
   * 서비스 제공자와 해당 Id를 통해 유저 반환
   * @param id
   * @param provider
   */
  findUserByProvideId(id: string, provider: OauthProvider): Promise<UserDto>;

  /**
   * 유저 데이터를 받아 유저 생성
   * @param data
   */
  createUser(data: CreateUserDto): Promise<UserDto>;

  /**
   * 유저 상세 정보 수정
   * @param id
   * @param data
   */
  updateUserDetail(id: number, data: UserDetailDto): Promise<UserDetailDto>;

  /**
   * 모든 관리자 목록 반환
   */
  findAllAdmin(): Promise<UserDto[]>;
}
