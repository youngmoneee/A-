import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatSchema } from '../entity/chat.schema';
import { CreateChatDto } from '../dto/createChatDto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = new this.chatModel(createChatDto);
    return newChat.save();
  }
}
