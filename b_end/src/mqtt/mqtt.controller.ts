import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MqttService } from './mqtt.service';
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

  @Get('device/:device')
  deviceDetail(@Param('device', ParseIntPipe) device: number) {
    return this.mqttService.getDeviceInfo(device);
  }

  @Post('device/:device')
  deviceRemote(@Param('device') device: string, @Body('command') command) {
    this.mqttService.remoteDevice(`${device}/input`, command);
    return HttpStatus.OK;
  }
}
