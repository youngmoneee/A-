import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * @summary: 요청에서 User의 정보를 가져오는 데코레이터
 */
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
