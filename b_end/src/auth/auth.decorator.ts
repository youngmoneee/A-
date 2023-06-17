import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';

/**
 * @summary: Get token from Authorization Header
 * @exception: Not Authorizationed => catch 401
 * @return: user
 */

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const token = req.headers.authorization;
    return token;
  },
);
