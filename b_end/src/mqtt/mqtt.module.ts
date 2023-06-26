import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { MqttGateway } from './mqtt.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MqttController],
  providers: [MqttService, MqttGateway],
})
export class MqttModule {}
