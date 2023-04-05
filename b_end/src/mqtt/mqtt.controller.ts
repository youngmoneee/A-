import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
@Controller('mqtt')
export class MqttController {
  @MessagePattern('test')
  async handleMessage(data: any) {
    console.log('Msg: ', data);
  }
}
