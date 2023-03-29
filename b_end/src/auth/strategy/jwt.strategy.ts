import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserDto } from '../../dto/user.dto';

export class JwtStrategy extends PassportStrategy(Strategy, 'local-jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload: any) {
    console.log(payload);
    return payload as UserDto;
  }
}
