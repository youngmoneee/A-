import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from '../dto/createChatDto';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async findAll(): Promise<Chat[]> {
    return this.chatModel.find().exec();
  }

  async create(chatSchema: Chat): Promise<Chat> {
    try {
      const newChat = new this.chatModel(chatSchema);
      const res = await newChat.save();
      return res;
    } catch (e) {
      throw e;
    }
  }
}
