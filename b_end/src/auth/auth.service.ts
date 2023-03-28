import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { GetUser } from './decorator/token.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateToken(user: UserDto): string {
    const tokenOptions = {
      //keyid: this.configService.get('JWT_TOKEN'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    };
    const token = 'Bearer ' + this.jwtService.sign(user, tokenOptions);
    if (token)
      this.logger.log(`${user.userName}'s Token ${token} is Generated.`);
    return token;
  }

  verifyToken(token: string): UserDto {
    try {
      const user = this.jwtService.verify(token);
      return user;
    } catch (e) {
      return null;
    }
  }

  getTokenId(): string {
    return this.configService.get('JWT_TOKEN');
  }
  getTokenOptions() {
    return {
      httpOnly: true,
    };
  }
}
