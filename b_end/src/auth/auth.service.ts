import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(user: UserDto): Promise<string> {
    return this.jwtService.sign(user);
  }

  async verifyToken(token: string): Promise<UserDto> {
    try {
      const user = this.jwtService.verify(token);
      return user;
    } catch (e) {
      return null;
    }
  }
}
