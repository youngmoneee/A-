import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttGateway } from './mqtt.gateway';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  constructor(
    private readonly mqttGateway: MqttGateway,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}
  onModuleInit() {
    this.client = mqtt.connect(
      'mqtt://' +
        this.configService.get('MQTT_HOST') +
        ':' +
        this.configService.get('MQTT_PORT'),
      { username: 'Nest Client' },
    );
    this.client.on('connect', async () => {
      try {
        //  새로 연결 시, 등록되어있는 모든 기기 구독
        const devices = await this.deviceAll();

        devices.forEach((item) => {
          this.client
            .subscribe(`${item.name}/#`, (err) => {
              if (err) console.error(err);
            })
            .on('message', (topic, msg) => {
              //  TODO: create DTO
              this.mqttGateway.publish(item.name, {
                topic: topic,
                value: Number(msg.toString()),
              });
            });
        });
      } catch (e) {
        console.error(e);
      }
    });
  }
  publishMessage(topic: string, msg: string) {
    //  아두이노는 너무 잘 끊겨서 qos 1로 함. retain 옵션으로 다시 구독하는 순간에 해당 메세지 전송받음
    this.client.publish(topic, msg, { qos: 1, retain: true }, (e) => {
      if (e) console.error(e);
    });
  }

  pubWS(device: string, data) {
    this.mqttGateway.publish(device, data);
  }

  async deviceAll() {
    try {
      return await this.prismaService.device.findMany();
    } catch (e) {
      console.error(e);
    }
  }

  async deviceNames(userId: number): Promise<string[]> {
    try {
      const res = await this.prismaService.userDevice.findMany({
        where: {
          userId,
        },
        include: {
          device: true,
        },
      });
      console.log(res);
      const deviceNames: string[] = res.map((device) => device.device.name);
      return deviceNames;
    } catch (e) {
      console.error(e);
    }
  }
  async deviceRegister(userId: number, device: string) {
    try {
      //  없으면 생성
      const res = await this.prismaService.device.upsert({
        where: { name: device },
        update: {},
        create: {
          name: device,
          adminId: userId,
        },
      });
      //  관계 생성
      try {
        await this.prismaService.userDevice.create({
          data: {
            userId,
            deviceId: res.id,
          },
        });
      } catch (e) {
        console.error(e);
      }
      return res.name;
    } catch (e) {
      console.error(e);
    }
    this.client
      .subscribe(`${device}/#`, (err) => {
        if (err) {
          console.error('Failed to subscribe to topic:', err);
        }
      })
      .on('message', (topic, msg) => {
        this.mqttGateway.publish(device, {
          topic: topic,
          value: Number(msg.toString()),
        });
      });
  }

  async getDeviceInfo(id: number) {
    try {
      const res = await this.prismaService.device.findFirst({
        where: {
          id,
        },
      });
      return res;
    } catch (e) {
      throw new NotFoundException(`No Device ${id}`);
    }
  }
}
