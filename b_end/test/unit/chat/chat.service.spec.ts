import { ChatService } from '../../../src/chat/chat.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ChatGateway } from '../../../src/chat/chat.gateway';
import { mockChatGateway } from './mocks/chat.gateway.mock';
import { ConfigService } from '@nestjs/config';
import { mockConfigService } from './mocks/config.service.mock';
import { mockChatModel } from './mocks/chat.model.mock';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { mockMongooseModule } from './mocks/mongoose.module.mock';
import { MulterModule } from '@nestjs/platform-express';
import { mockMulterModule } from './mocks/multer.module.mock';
import { Chat } from '../../../src/dto/createChatDto';
import { UserDto } from '../../../src/dto/user.dto';
import { ROLE } from '../../../src/dto/enum.role';
import { BadGatewayException } from '@nestjs/common';

describe('Chat Service Test', () => {
  let service: ChatService;

  const mockUser: UserDto = { id: 1, userName: 'test', userRole: ROLE.USER };
  const mockMessage = 'test message';
  const mockChat: Chat = {
    createdAt: new Date(),
    user: mockUser,
    msg: mockMessage,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        { provide: ChatGateway, useValue: mockChatGateway },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getModelToken(Chat.name), useValue: mockChatModel },
        { provide: MongooseModule, useValue: mockMongooseModule },
        { provide: MulterModule, useValue: mockMulterModule },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    mockChatModel.clear();
  });
  it('Chat Service 생성 테스트', () => {
    expect(service).toBeDefined();
  });
  describe('create Test', () => {
    describe('create Test', () => {
      it('Model 생성 테스트', async () => {
        const mockModel = new mockChatModel(mockChat);
        expect(await mockModel).toBeDefined();
      });
      it('Model 저장 테스트', async () => {
        const mockModel = new mockChatModel(mockChat);
        expect(await mockModel.save()).toEqual(mockChat);
      });
      it('비어있는 DB 조회 시, 빈 배열 반환', async () => {
        expect(await mockChatModel.find().exec()).toEqual([]);
      });
      it('채팅 생성 후, 배열 조회', async () => {
        await service.create(mockChat);
        expect(await mockChatModel.find().exec()).toEqual([mockChat]);
      });
      describe('예외 테스트', () => {
        it('service에서 save 실행여부 테스트', async () => {
          mockChatModel.prototype.save.mockClear();
          expect(mockChatModel.prototype.save).not.toHaveBeenCalled();
          await service.create(mockChat);
          expect(mockChatModel.prototype.save).toHaveBeenCalled();
        });
        it('실행 도중 에러 시, Throw Bad Gateway Exception', async () => {
          mockChatModel.prototype.save = jest
            .fn()
            .mockRejectedValueOnce(new Error('MongoDB Error'));
          await expect(service.create(mockChat)).rejects.toThrow(
            BadGatewayException,
          );
        });
      });
    });
  });
  describe('findAll Test', () => {
    it('빈 Db 조회 테스트', async () => {
      expect(await service.findAll()).toEqual([]);
    });
    it('생성 후 조회 테스트', async () => {
      await mockChatModel.save(mockChat);
      expect(await service.findAll()).toEqual([mockChat]);
    });
  });
});
