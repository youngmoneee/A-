import { MqttService } from '../../../src/mqtt/mqtt.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma.service';
import { mockPrismaService } from './mocks/prisma.service.mock';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from './mocks/config.service.mock';
import { mockDeviceRepository } from './mocks/device.repository.mock';
import { MqttGateway } from '../../../src/mqtt/mqtt.gateway';
import { mockMqttGateway } from './mocks/mqtt.gateway.mock';

describe('Mqtt Service Test', () => {
  let service: MqttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MqttService,
        { provide: MqttGateway, useValue: mockMqttGateway },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: 'Repository', useValue: mockDeviceRepository },
      ],
    }).compile();

    service = module.get<MqttService>(MqttService);
  });

  it('Mqtt Service 생성 테스트', () => {
    expect(service).toBeDefined();
  });
});
