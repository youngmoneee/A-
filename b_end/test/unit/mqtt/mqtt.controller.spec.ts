import { Test, TestingModule } from '@nestjs/testing';
import { MqttController } from '../../../src/mqtt/mqtt.controller';
import { MqttService } from '../../../src/mqtt/mqtt.service';
import { MqttProvider } from '../../../src/mqtt/mqtt.provider';
import { mockMqttProvider } from './mocks/mqtt.provider.mock';
import { MqttGateway } from '../../../src/mqtt/mqtt.gateway';
import { mockMqttGateway } from './mocks/mqtt.gateway.mock';
import { PrismaService } from '../../../src/prisma.service';
import { mockPrismaService } from './mocks/prisma.service.mock';
import { mockDeviceRepository } from './mocks/device.repository.mock';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from './mocks/config.service.mock';
import { HttpStatus } from '@nestjs/common';
import { mockUserRepository } from '../user/mocks/user.repository.mock';
import { UserDto } from '../../../src/dto/user.dto';
import { ROLE } from '../../../src/dto/enum.role';

describe('Mqtt Controller Test', () => {
  let controller: MqttController;
  let service: MqttService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MqttController],
      providers: [
        MqttService,
        { provide: MqttProvider, useValue: mockMqttProvider },
        { provide: MqttGateway, useValue: mockMqttGateway },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: 'Repository', useValue: mockDeviceRepository },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    controller = module.get<MqttController>(MqttController);
    service = module.get<MqttService>(MqttService);
    service.onModuleInit();
    mockDeviceRepository.clear();
  });
  it('Mqtt Controller 생성 테스트', () => {
    expect(controller).toBeDefined();
  });
  it('Mqtt Service 생성 테스트', () => {
    expect(service).toBeDefined();
  });
  describe('deviceList', () => {
    const mockGetUser = {
      transform: jest.fn().mockReturnValue({
        id: 1,
      }),
    };
    it('등록 기기가 없는 유저의 요청', async () => {
      expect(await controller.deviceList(mockGetUser.transform())).toEqual([]);
    });
    it('기기 등록 후 재요청', async () => {
      await service.deviceRegister(1, 'test');
      expect(await controller.deviceList(mockGetUser.transform())).toEqual([
        'test',
      ]);
    });
  });
  describe('register Test', () => {
    const mockGetUser = {
      transform: jest.fn().mockReturnValue({ id: 2 }),
    };
    const mockBody = {
      transform: jest.fn().mockReturnValue('test-device'),
    };
    it('유저의 신규 기기 등록', async () => {
      expect(
        await controller.register(
          mockGetUser.transform(),
          mockBody.transform(),
        ),
      ).toEqual(HttpStatus.CREATED);
    });
    it('유저가 같은 기기 등록 시도', async () => {
      await controller.register(mockGetUser.transform(), mockBody.transform());
      expect(
        await controller.register(
          mockGetUser.transform(),
          mockBody.transform(),
        ),
      ).toEqual(HttpStatus.OK);
    });
    it('다른 유저가 같은 기기 등록 시도', async () => {
      mockGetUser.transform.mockResolvedValueOnce(3);
      expect(
        await controller.register(
          mockGetUser.transform(),
          mockBody.transform(),
        ),
      ).toEqual(HttpStatus.CREATED);
    });
  });
  describe('deviceDetail Test', () => {
    const mockParam = {
      transform: jest.fn().mockReturnValue(0),
    };
    it('특정 기기의 상세 정보 리턴', async () => {
      const mockUser = 1;
      const mockDevice = 'test';
      await service.deviceRegister(mockUser, mockDevice);
      const deviceInfo = await controller.deviceDetail(mockParam.transform());
      expect(deviceInfo.adminId).toEqual(mockUser);
      expect(deviceInfo.name).toEqual(mockDevice);
    });
    it('기기에 등록된 유저와 실제 유저 일치 여부', async () => {
      const userId = 1;
      const mockUser = await mockUserRepository.findUserById(userId);
      const mockDevice = 'test';
      await service.deviceRegister(userId, mockDevice);
      const deviceInfo = await controller.deviceDetail(mockParam.transform());
      expect(deviceInfo.users[0]).toEqual(mockUser);
    });
  });
  describe('deviceRemove Test', () => {
    const mockDevice = 'test';
    const mockGetUser = {
      transform: jest.fn().mockReturnValue({
        id: 1,
        userName: 'test',
        userRole: ROLE.USER,
      } as UserDto),
    };
    const mockParam = {
      transform: jest.fn().mockReturnValue(mockDevice),
    };
    it('기기 생성 후 삭제 시도', async () => {
      expect(await controller.deviceList(mockGetUser.transform())).toEqual([]);
      await controller.register(mockGetUser.transform(), mockParam.transform());
      expect(await controller.deviceList(mockGetUser.transform())).toEqual([
        'test',
      ]);
      await controller.deviceRemove(
        mockGetUser.transform(),
        mockParam.transform(),
      );
      expect(await controller.deviceList(mockGetUser.transform())).toEqual([]);
    });
    describe('결과 값 비교', () => {
      it('성공 시 No Content 반환', async () => {
        expect(
          await controller.deviceRemove(
            mockGetUser.transform(),
            mockParam.transform(),
          ),
        ).toBe(HttpStatus.NO_CONTENT);
      });
      it('에러 시 Bad Gateway 반환', async () => {
        mockDeviceRepository.findDeviceByName.mockRejectedValue(
          new Error('SQL Error'),
        );
        expect(
          await controller.deviceRemove(
            mockGetUser.transform(),
            mockParam.transform(),
          ),
        ).toBe(HttpStatus.BAD_GATEWAY);
      });
    });
  });
});
