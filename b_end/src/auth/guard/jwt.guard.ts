import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const user = context.switchToHttp().getRequest().user;

    const now = new Date();
    console.log('----');
    console.log(user);
    console.log(now.getTime());
    if (user) return true;
    return false;
  }
}
