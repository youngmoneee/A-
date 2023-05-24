import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * @summary : BearerToken 생성
 * @description : AuthGuard를 거쳐 Passport에서 req.user를 채웠다면 이를 이용해 토큰을 발급합니다.
 */
@Injectable()
export class AuthInterceptor implements NestInterceptor {
  @Inject(AuthService) private readonly authService: AuthService;
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const token = this.authService.generateToken(req.user);

    if (!token) throw new UnauthorizedException();
    //  token을 응답 헤더의 authorization에 담아 클라이언트에게 전송
    //req.setHeader(this.authService.getTokenId(), token);
    res.cookie(this.authService.getTokenId(), token);
    return next.handle();
  }
}
