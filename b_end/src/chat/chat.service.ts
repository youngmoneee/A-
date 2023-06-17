import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../entity/chat.schema';
import { CreateChatDto } from '../dto/createChatDto';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private readonly chatGateway: ChatGateway,
  ) {}

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    try {
      const newChat = new this.chatModel(createChatDto);
      const res = await newChat.save();
      this.chatGateway.publish(res);
      return res;
    } catch (e) {
      throw e;
    }
  }
}
