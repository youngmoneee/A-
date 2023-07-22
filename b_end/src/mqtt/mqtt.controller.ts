import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { Response } from 'express';
import { GetUser } from '../user/user.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
@Controller('mqtt')
@UseGuards(JwtGuard)
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('device')
  async deviceList(@GetUser() user) {
    return await this.mqttService.deviceNames(user.id);
  }
  @Post('device')
  async register(@GetUser() user, @Body('device') device) {
    await this.mqttService.deviceRegister(user.id, device);
  }

  @Get('device/:id')
  deviceDetail(@Param('id', ParseIntPipe) id: number) {
    return this.mqttService.getDeviceInfo(id);
  }

  @Get('on')
  ir(@Res() res: Response) {
    this.mqttService.publishMessage('dev1/on', '');
    return res.sendStatus(200);
  }
  @Get('off')
  iroff(@Res() res: Response) {
    this.mqttService.publishMessage('dev1/off', '');
    return res.sendStatus(200);
  }
  @Get('test')
  test(@Query('val', ParseIntPipe) val: number) {
    this.mqttService.pubWS('dev2', {
      topic: 'dev2/hi',
      value: val,
    });
  }
  @Get('test2')
  test2(@Query('val', ParseIntPipe) val: number) {
    this.mqttService.pubWS('dev2', {
      topic: 'dev2/zzz/qwe',
      value: val,
    });
  }
}
