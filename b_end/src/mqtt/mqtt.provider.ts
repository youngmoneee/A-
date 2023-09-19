import * as mqtt from 'mqtt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MqttProvider {
  constructor(private configService: ConfigService) {}

  createClient(): mqtt.MqttClient {
    const mqttUrl =
      'mqtt://' +
      this.configService.get('MQTT_HOST') +
      ':' +
      this.configService.get('MQTT_PORT');
    return mqtt.connect(mqttUrl, { username: 'A-' });
  }
}
