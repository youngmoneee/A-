import { DeviceDto } from '../../../../src/dto/device.dto';
import { CreateDeviceDto } from '../../../../src/dto/createDeviceDto';
import { ConflictException } from '@nestjs/common';
import { CreateRelationDto } from '../../../../src/dto/createRelationDto';
import { mockUserRepository } from '../../user/mocks/user.repository.mock';

const mockDeviceDb: CreateDeviceDto[] = [];
let mockUserDeviceDb: CreateRelationDto[] = [];
export const mockDeviceRepository = {
  clear: jest.fn().mockImplementation(() => {
    mockDeviceDb.length = 0;
    mockUserDeviceDb.length = 0;
  }),
  findAll: jest.fn().mockImplementation(async () =>
    mockDeviceDb.map(
      (device, idx) =>
        ({
          id: idx,
          name: device.name,
          adminId: device.adminId,
        } as DeviceDto),
    ),
  ),
  findDeviceById: jest.fn().mockImplementation(async (id) => {
    if (id >= mockDeviceDb.length) return null;
    return {
      id,
      name: mockDeviceDb[id].name,
      adminId: mockDeviceDb[id].adminId,
    } as DeviceDto;
  }),
  findDeviceByName: jest.fn().mockImplementation(async (name) =>
    mockDeviceDb
      .map(
        (device, id) =>
          ({
            id,
            name: device.name,
            adminId: device.adminId,
          } as DeviceDto),
      )
      .find((device) => device.name === name),
  ),
  findDevicesByUserId: jest.fn().mockImplementation(async (userId) => {
    const ud = mockUserDeviceDb
      .filter((v) => v.userId === userId)
      .map((device) => device.deviceId);
    return mockDeviceDb
      .map(
        (device, idx) =>
          ({
            id: idx,
            name: device.name,
            adminId: device.adminId,
          } as DeviceDto),
      )
      .filter((device) => ud.includes(device.id));
  }),
  findUsersByDeviceId: jest.fn().mockImplementation(async (id) => {
    const ud = mockUserDeviceDb.filter((ud) => ud.deviceId === id);
    return await Promise.all(
      ud.map(
        async (device) => await mockUserRepository.findUserById(device.userId),
      ),
    );
  }),
  createDevice: jest
    .fn()
    .mockImplementation(async (createDeviceDto: CreateDeviceDto) => {
      if (mockDeviceDb.find((device) => device.name === createDeviceDto.name))
        throw new ConflictException();
      mockDeviceDb.push(createDeviceDto);
      return {
        id: mockDeviceDb.length - 1,
        name: createDeviceDto.name,
        adminId: createDeviceDto.adminId,
      } as DeviceDto;
    }),
  createRelation: jest
    .fn()
    .mockImplementation(async (data: CreateRelationDto) => {
      if (
        mockUserDeviceDb.find(
          (ud) => ud.userId === data.userId && ud.deviceId === data.deviceId,
        )
      )
        throw new ConflictException();
      mockUserDeviceDb.push(data);
      return true;
    }),
  deleteRelation: jest
    .fn()
    .mockImplementation(async (data: CreateRelationDto) => {
      if (
        !mockUserDeviceDb.find(
          (ud) => ud.userId === data.userId && ud.deviceId === data.deviceId,
        )
      )
        return false;
      mockUserDeviceDb = mockUserDeviceDb.filter(
        (ud) => ud.userId !== data.userId || ud.deviceId !== data.deviceId,
      );
      return true;
    }),
};
