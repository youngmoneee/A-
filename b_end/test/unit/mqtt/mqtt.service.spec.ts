import { MqttService } from '../../../src/mqtt/mqtt.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../src/prisma.service';
import { mockPrismaService } from './mocks/prisma.service.mock';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from './mocks/config.service.mock';
import { mockDeviceRepository } from './mocks/device.repository.mock';
import { MqttGateway } from '../../../src/mqtt/mqtt.gateway';
import { mockMqttGateway } from './mocks/mqtt.gateway.mock';
import { MqttProvider } from '../../../src/mqtt/mqtt.provider';
import { mockMqttProvider } from './mocks/mqtt.provider.mock';
import { CreateDeviceDto } from '../../../src/dto/createDeviceDto';
import { HttpStatus } from '@nestjs/common';
import { mockUserRepository } from '../user/mocks/user.repository.mock';

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
        { provide: MqttProvider, useValue: mockMqttProvider },
      ],
    }).compile();

    service = module.get<MqttService>(MqttService);
    service.onModuleInit();
  });

  it('Mqtt Service 생성 테스트', () => {
    expect(service).toBeDefined();
  });
  describe('DeviceAll Test', () => {
    it('DB 내 기기와 비교', async () => {
      const devices = await mockDeviceRepository.findAll();
      expect(await service.deviceAll()).toEqual(devices);
    });
    it('객체 생성 후, 비교', async () => {
      await mockDeviceRepository.createDevice({
        name: 'test-device',
        adminId: 1,
      } as CreateDeviceDto);
      const devices = await mockDeviceRepository.findAll();
      expect(await service.deviceAll()).toEqual(devices);
    });
  });
  describe('DeviceName Test', () => {
    it('기기 등록 후 deviceNames 결과와 비교', async () => {
      await service.deviceRegister(1, 'test1');
      await service.deviceRegister(1, 'test2');
      await service.deviceRegister(1, 'test3');
      expect(await service.deviceNames(1)).toEqual(['test1', 'test2', 'test3']);
    });
    it('기기를 등록하지 않은 유저의 결과 비교', async () => {
      expect(await service.deviceNames(2)).toEqual([]);
    });
  });
  describe('deviceRegister', () => {
    const mockUser = 3000;
    const mockDevice = 'test';
    it('새로 생성 시, HttpStatus.CREATED 반환', async () => {
      expect(await service.deviceRegister(mockUser, mockDevice)).toEqual(
        HttpStatus.CREATED,
      );
    });
    it('기기 등록 중인 유저가 동일한 기기 등록 시, HttpStatus.OK 반환', async () => {
      expect(await service.deviceRegister(mockUser, mockDevice)).toEqual(
        HttpStatus.OK,
      );
    });
    it('새로 등록된 기기의 admin이 User인지 테스트', async () => {
      expect(
        (await mockDeviceRepository.findDeviceByName(mockDevice)).adminId,
      ).toEqual(mockUser);
    });
  });
  describe('getDeviceInfo Test', () => {
    const mockUser = 3000;
    const mockDevice = 'test';

    it('생성 후 디바이스 상세 정보 비교', async () => {
      mockUserRepository.findUserById.mockResolvedValueOnce(mockUser);
      await service.deviceRegister(mockUser, mockDevice);
      const deviceId = (
        await mockDeviceRepository.findDevicesByUserId(mockUser)
      )[0].id;
      expect(await service.getDeviceInfo(deviceId)).toEqual({
        id: deviceId,
        name: mockDevice,
        adminId: mockUser,
        users: [mockUser],
      });
    });
  });
  describe('removeDevice Test', () => {
    const mockUser = 3000;
    const mockDevice = 'test';
    it('생성 후 삭제 테스트', async () => {
      mockUserRepository.findUserById.mockResolvedValueOnce(mockUser);
      await service.deviceRegister(mockUser, mockDevice);
      expect(await service.deviceNames(mockUser)).toEqual([mockDevice]);
      await service.removeDevice(mockUser, mockDevice);
      expect(await service.deviceNames(mockUser)).toEqual([]);
    });
  });
});
