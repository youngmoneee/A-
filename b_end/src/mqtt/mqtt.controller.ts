import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { Response } from 'express';
@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}
  @MessagePattern('test')
  async handleMessage(data: any) {
    console.log('Msg: ', data);
  }

  @Get('topic')
  topics() {
    return this.mqttService.topicList();
  }
  @Post('topic')
  register(@Res() res: Response, @Body('topic') topic) {
    this.mqttService.topicRegister(topic);
    return res.sendStatus(201);
  }
}
