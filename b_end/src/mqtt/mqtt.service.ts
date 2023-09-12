import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttGateway } from './mqtt.gateway';
import { ConfigService } from '@nestjs/config';
import { DeviceDto } from '../dto/device.dto';
import { IDeviceRepository } from './repository/interface';
import { DeviceDetailDto } from '../dto/deviceDetailDto';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;
  constructor(
    private readonly mqttGateway: MqttGateway,
    private readonly configService: ConfigService,
    @Inject('Repository') private readonly repository: IDeviceRepository,
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
          this.client.subscribe(`${item.name}/#`, (err) => {
            if (err) {
              console.error('Failed to subscribe to topic:', err);
            }
          });
        });
      } catch (e) {
        console.error(e);
      }
    });
    this.client.on('message', (topic, msg) => {
      if (topic.split('/').pop() === 'input') return;
      this.mqttGateway.publish(topic.split('/')[0], {
        topic: topic,
        value: Number(msg.toString()),
      });
    });
  }
  remoteDevice(topic: string, msg: string) {
    //  아두이노는 너무 잘 끊겨서 qos 1로 함. retain 옵션으로 다시 구독하는 순간에 해당 메세지 전송받음
    this.client.publish(topic, msg, { qos: 1, retain: true }, (e) => {
      if (e) throw new HttpException('Mqtt Error', HttpStatus.BAD_GATEWAY);
    });
  }

  async deviceAll(): Promise<DeviceDto[]> {
    return await this.repository.findAll();
  }

  async deviceNames(userId: number): Promise<string[]> {
    const res = await this.repository.findDevicesByUserId(userId);
    return res.map((device) => device.name);
  }
  async deviceRegister(userId: number, deviceName: string) {
    //  이미 관계가 존재하면 아무 일도 일어나지 않음
    if (deviceName in (await this.deviceNames(userId))) return HttpStatus.OK;
    let device = await this.repository.findDeviceByName(deviceName);
    if (!device) {
      // 장치가 없으면 생성, 생성자가 admin
      device = await this.repository.createDevice({
        name: deviceName,
        adminId: userId,
      });
    }

    // 관계 생성
    await this.repository.createRelation({
      userId,
      deviceId: device.id,
    });

    this.client.subscribe(`${deviceName}/#`, (err) => {
      if (err) {
        console.error('Failed to subscribe to topic:', err);
      }
    });
    return HttpStatus.CREATED;
  }

  async getDeviceInfo(id: number): Promise<DeviceDetailDto> {
    const device = await this.repository.findDeviceById(id);
    const users = await this.repository.findUsersByDeviceId(id);
    return {
      ...device,
      users,
    } as DeviceDetailDto;
  }
  async removeDevice(userId: number, deviceName: string) {
    const device = await this.repository.findDeviceByName(deviceName);
    if (!device) return;
    await this.repository.deleteRelation({
      userId: userId,
      deviceId: device.id,
    });
  }
}
