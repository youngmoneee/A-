import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('local-jwt') {
  //constructor(private readonly jwtService: JwtService) {}
  /*
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        //    const decoded = this.jwtService.verify(token); // 토큰 검증
        //    req.user = decoded; // req 객체에 유저 정보 저장
        return true;
      } catch (err) {
        console.log(err);
      }
    }
    return false;
  }
  
   */
}
