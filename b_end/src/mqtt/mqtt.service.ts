import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttGateway } from './mqtt.gateway';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private topics = new Map() as Map<string, Array<string | number>>;
  constructor(private readonly mqttGateway: MqttGateway) {}
  onModuleInit() {
    this.client = mqtt.connect('mqtt://mosquitto:1883', { username: 'nest' });
    this.client.on('connect', (cli, msg) => {
      console.log('Client Connected.');
    });
  }

  publishMessage(topic: string, msg: string) {
    this.client.publish(topic, msg, (e) => {
      if (e) console.error(e);
    });
  }

  topicList(): Array<string> {
    return Array.from(this.topics.keys());
  }
  topicRegister(topic: string) {
    if (this.topics.has(topic)) return;
    this.topics.set(topic, []);
    this.client.subscribe(topic, (err) => {
      console.log(`Registered ${topic}`);
      if (err) {
        console.error('Failed to subscribe to topic:', err);
      }
    });
    this.client.on('message', (topic, msg) => {
      this.mqttGateway.publish(topic, Number(msg.toString()));
      console.log('on Message : ', topic, ', ', msg.toString());
    });
  }
}
