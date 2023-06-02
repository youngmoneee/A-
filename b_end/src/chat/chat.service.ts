import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatSchema } from '../entity/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async create(chat: Chat): Promise<Chat> {
    const newChat = new this.chatModel(chat);
    return newChat.save();
  }
}
