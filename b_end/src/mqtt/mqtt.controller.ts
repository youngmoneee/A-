import {
  Body,
  Controller,
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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeviceDto } from '../dto/device.dto';

@ApiTags('Device')
@ApiBearerAuth()
@Controller('mqtt')
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
  @Get('device')
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
  @Post('device')
  async register(@GetUser() user, @Body('device') device) {
    return await this.mqttService.deviceRegister(user.id, device);
  }

  @ApiOperation({
    summary: '유저가 등록한 기기 리스트에 해당 기기를 추가',
    description:
      '기존 기기일 경우 Device의 유저 목록에 추가, 새로운 기기일 경우 Device의 Admin을 해당 유저로 등록',
  })
  @ApiParam({
    name: 'device',
    description: '조회하려는 기기의 deviceId',
    type: 'number',
  })
  @ApiOkResponse({ description: '기기의 정보 반환', type: DeviceDto })
  @ApiUnauthorizedResponse({
    description: '권한이 없는 요청에 대해 UnAuthentication 반환',
  })
  @ApiNotFoundResponse({ description: '기기가 존재하지 않을 시 404 반환' })
  @Get('device/:device')
  deviceDetail(@Param('device', ParseIntPipe) device: number) {
    return this.mqttService.getDeviceInfo(device);
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
  @Post('device/:device')
  deviceRemote(@Param('device') device: string, @Body('command') command) {
    this.mqttService.remoteDevice(`${device}/input`, command);
    return HttpStatus.OK;
  }
}
