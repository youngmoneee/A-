import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Chat } from '../entity/chat.schema';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  logger = new Logger(ChatController.name);
  @Get()
  async findAll() {
    this.logger.debug(`Called ${this.findAll.name}`);
    return await this.chatService.findAll();
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async sendMessage(
    @GetUser() sender: string,
    @UploadedFile() files,
    @Body('msg') msg,
  ) {
    this.logger.debug(`Called ${this.sendMessage.name}`);
    console.log('Sender::', sender);
    console.log('File::', files);
    console.log('Message::', msg);
    const chat: Chat = {
      user: sender,
      msg: msg,
      imgUrl: files,
    };
    return await this.chatService.create(chat);
  }
}
