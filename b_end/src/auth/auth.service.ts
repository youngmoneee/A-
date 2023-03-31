import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(user: UserDto): string {
    const token = this.jwtService.sign(user);
    if (token)
      this.logger.log(`${user.userName}'s Token ${token} is Generated.`);
    return token;
  }

  verifyToken(token: string): UserDto {
    try {
      const user = this.jwtService.verify(token);
      this.logger.debug(`${user.userName}'s info ${user}`);
      return user;
    } catch (e) {
      this.logger.log(`token decode failed`);
      return null;
    }
  }

  getTokenId(): string {
    return this.configService.get('JWT_TOKEN');
  }
  getTokenOptions() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      httpOnly: true,
    };
  }
}
