import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../user/user.decorator';
import { UserDto } from '../dto/user.dto';
import { BugService } from './bug.service';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(JwtGuard)
@ApiTags('Bug Report')
@Controller('bug')
export class BugController {
  constructor(private readonly bugService: BugService) {}

  @ApiOperation({
    summary: '버그 리포트',
    description: '유저가 발견한 버그를 제보하면 해당 레포지토리 이슈에 등록',
  })
  @ApiBearerAuth('accessToken')
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', nullable: false },
        body: { type: 'string', nullable: true },
      },
    },
  })
  @ApiCreatedResponse({ description: '성공적으로 생성함' })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 요청에 대해 UnAuthentication 반환',
  })
  @ApiBadRequestResponse({
    description:
      '400, 403, 404, 410, 422 응답에 대해 클라이언트에게 Bad Request 반환 후, 상세 정보 로깅',
  })
  @ApiBadGatewayResponse({
    description:
      '서비스 사용 불가 등 Github 서버 에러 시 Bad Gateway 상태 반환 후 로깅',
  })
  @Post('report')
  async reportBug(
    @GetUser() user: UserDto,
    @Body('title') title: string,
    @Body('body') body: string,
  ) {
    try {
      await this.bugService.reportBug(user.userName, title, body);
      return HttpStatus.CREATED;
    } catch (e) {
      console.error(e);
      console.error(e.status, ' : ', e.statusText);
      if (e.status / 100 === 4) return HttpStatus.BAD_REQUEST;
      else return HttpStatus.BAD_GATEWAY;
    }
  }
}
