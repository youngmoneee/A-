import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  onModuleInit() {
    this.client = mqtt.connect('mqtt://mosquitto:1883', { username: 'nest' });
    this.client.on('connect', () => {
      this.client.subscribe('/test/temp', (err) => {
        if (err) {
          console.error('Failed to subscribe to topic:', err);
        }
      });
    });

    this.client.on('message', (topic, message) => {
      if (topic === '/test/temp') {
        console.log('Received message on /test/temp:', message.toString());
      }
    });
  }

  publishTemp(msg: string) {
    this.client.publish('/test/temp', msg, (err) => {
      if (err) {
        console.error('Failed to publish:', err);
      }
    });
  }
}
