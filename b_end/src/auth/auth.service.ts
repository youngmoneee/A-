import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  generateToken(user: UserDto): string {
    return this.jwtService.sign(user);
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

  async userVerify(user: UserDto): Promise<boolean> {
    const res = await this.prismaService.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!res) return false;
    return true;
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
