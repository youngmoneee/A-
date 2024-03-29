import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { GetUser } from '../user/user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeviceDto } from '../dto/device.dto';
import { UserDto } from '../dto/user.dto';

@ApiTags('Device')
@ApiBearerAuth('accessToken')
@Controller('device')
@UseGuards(JwtGuard)
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @ApiOperation({
    summary: '유저가 등록한 device 목록을 반환',
    description:
      '요청의 Bearer Token을 통해 유저 정보를 확인 후, 해당 유저가 등록한 모든 기기를 문자열 배열로 반환',
  })
  @ApiOkResponse({
    description: '유저가 등록한 모든 기기 반환',
    type: String,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 요청에 대해 UnAuthentication 반환',
  })
  @Get('/')
  async deviceList(@GetUser() user) {
    return await this.mqttService.deviceNames(user.id);
  }

  @ApiOperation({
    summary: '유저가 등록한 기기 리스트에 해당 기기를 추가',
    description:
      '기존 기기일 경우 Device의 유저 목록에 추가, 새로운 기기일 경우 Device의 Admin을 해당 유저로 등록',
  })
  @ApiBody({
    schema: {
      properties: {
        device: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({ description: '이미 등록되어 있을 시, Ok 반환' })
  @ApiCreatedResponse({ description: '성공적으로 등록 시, Created 상태 반환' })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 요청에 대해 UnAuthentication 반환',
  })
  @ApiConflictResponse({
    description: '이미 존재하는 기기 등록 시 409 상태코드 반환',
  })
  @Post('/')
  async register(@GetUser() user, @Body('device') device) {
    return await this.mqttService.deviceRegister(user.id, device);
  }

  @ApiOperation({
    summary: '기기의 상세 정보 조회',
    description: '파라미터로 들어오는 device ID를 통해 기기의 상세 정보를 조회',
  })
  @ApiParam({
    name: 'device',
    description: '조회하려는 기기의 deviceId',
    type: 'number',
  })
  @ApiOkResponse({ description: '기기의 정보 반환', type: DeviceDto })
  @ApiBadRequestResponse({ description: 'string이 들어왔을 경우 400 반환' })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 요청에 대해 UnAuthentication 반환',
  })
  @ApiNotFoundResponse({ description: '기기가 존재하지 않을 시 404 반환' })
  @Get('/:device')
  async deviceDetail(@Param('device', ParseIntPipe) device: number) {
    return await this.mqttService.getDeviceInfo(device);
  }

  @ApiOperation({
    summary: '특정 기기에 대해 명령을 전송',
    description:
      'Device 이름을 Param으로 받아, Body의 command를 payload로 가지는 이벤트 생성',
  })
  @ApiParam({
    name: 'device',
    description: '명령을 전송하는 topic/device의 이름',
    type: 'string',
  })
  @ApiBody({
    schema: {
      properties: {
        command: { type: 'string' },
      },
    },
  })
  @ApiOkResponse({ description: '이벤트 전송 완료 후, 200 반환' })
  @ApiBadGatewayResponse({ description: 'MQTT 서버 에러 시, 502 반환' })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 요청에 대해 UnAuthentication 반환',
  })
  @Post('/:device')
  deviceRemote(@Param('device') device: string, @Body('command') command) {
    this.mqttService.remoteDevice(`${device}/input`, command);
    return HttpStatus.NO_CONTENT;
  }

  @ApiOperation({
    summary: '유저의 등록 기기 목록 중 특정 기기를 제거',
    description:
      'Device 이름을 Param으로 받아, 요청을 보낸 클라이언트가 등록한 기기 목록에서 제거',
  })
  @ApiParam({
    name: 'device',
    description: '제거하려는 device의 이름',
    type: 'string',
  })
  @ApiNoContentResponse({
    description:
      '유저가 등록한 기기 목록 중, 해당 기기가 없거나 기기 제거가 완료 되었다면, 204 반환',
  })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 요청에 대해 UnAuthentication 반환',
  })
  @ApiBadGatewayResponse({ description: 'DB 에러 시 502 반환' })
  @Delete('/:device')
  async deviceRemove(
    @GetUser() user: UserDto,
    @Param('device') device: string,
  ) {
    try {
      await this.mqttService.removeDevice(user.id, device);
    } catch (e) {
      return HttpStatus.BAD_GATEWAY;
    }
    return HttpStatus.NO_CONTENT;
  }
}
