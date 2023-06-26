import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { Response } from 'express';
@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Get('topic')
  topics() {
    return this.mqttService.topicList();
  }
  @Post('topic')
  register(@Res() res: Response, @Body('topic') topic) {
    this.mqttService.topicRegister(topic);
    //  TODO : FE로부터 입력받는 상황 고려해 WS || Controller에도 등록필요
    return res.sendStatus(201);
  }
}
