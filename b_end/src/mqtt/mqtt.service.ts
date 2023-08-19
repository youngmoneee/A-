import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import * as mqtt from 'mqtt';
import { MqttGateway } from './mqtt.gateway';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { DeviceDto } from '../dto/device.dto';
import { UserDto } from '../dto/user.dto';

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
              //  Ignore messages if what is being sent to Device
              if (topic.split('/').pop() === 'input') return;

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
  remoteDevice(topic: string, msg: string) {
    //  아두이노는 너무 잘 끊겨서 qos 1로 함. retain 옵션으로 다시 구독하는 순간에 해당 메세지 전송받음
    this.client.publish(topic, msg, { qos: 1, retain: true }, (e) => {
      if (e) throw new HttpException('Mqtt Error', HttpStatus.BAD_GATEWAY);
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
      return res.map((device) => device.device.name);
    } catch (e) {
      console.error(e);
    }
  }
  async deviceRegister(userId: number, deviceName: string) {
    //  이미 관계가 존재하면 아무 일도 일어나지 않음
    if (deviceName in (await this.deviceNames(userId))) return HttpStatus.OK;
    let device = await this.prismaService.device.findUnique({
      where: { name: deviceName },
    });
    if (!device) {
      // 장치가 없으면 생성, 생성자가 admin
      device = await this.prismaService.device.create({
        data: {
          name: deviceName,
          adminId: userId,
        },
      });
    }

    // 관계 생성
    try {
      await this.prismaService.userDevice.create({
        data: {
          userId,
          deviceId: device.id,
        },
      });
    } catch (e) {
      console.error(e);
      return HttpStatus.NOT_FOUND;
    }

    this.client
      .subscribe(`${deviceName}/#`, (err) => {
        if (err) {
          console.error('Failed to subscribe to topic:', err);
        }
      })
      .on('message', (topic, msg) => {
        if (topic.split('/').pop() === 'input') return;
        this.mqttGateway.publish(deviceName, {
          topic: topic,
          value: Number(msg.toString()),
        });
      });

    return HttpStatus.CREATED;
  }

  async getDeviceInfo(id: number): Promise<DeviceDto> {
    try {
      const device = await this.prismaService.device.findFirst({
        where: {
          id,
        },
        include: {
          userDevices: {
            select: {
              user: {
                select: {
                  id: true,
                  provider: true,
                  userId: true,
                  userName: true,
                  userEmail: true,
                  userImage: true,
                  userRole: true,
                },
              },
            },
          },
        },
      });
      const users = device.userDevices.map((userDevice) => userDevice.user);
      const userDtos = users.map((user) => {
        return {
          id: user.id,
          provider: user.provider,
          userId: user.userId,
          userName: user.userName,
          userEmail: user.userEmail,
          userImage: user.userImage,
          userRole: user.userRole,
        } as UserDto;
      });
      return {
        id: device.id,
        name: device.name,
        adminId: device.adminId,
        user: userDtos,
      } as DeviceDto;
    } catch (e) {
      throw new NotFoundException(`No Device ${id}`);
    }
  }
  async removeDevice(userId: number, deviceName: string) {
    const device = await this.prismaService.device.findFirst({
      where: {
        name: deviceName,
      },
    });
    if (!device) return;
    await this.prismaService.userDevice.deleteMany({
      where: {
        userId: userId,
        deviceId: device.id,
      },
    });
  }
}
