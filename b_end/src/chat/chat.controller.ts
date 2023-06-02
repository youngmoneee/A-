import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../user/user.decorator';
import { GetToken } from '../auth/auth.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Chat } from '../entity/chat.schema';
import { ChatService } from './chat.service';
import { UserDto } from '../dto/user.dto';
import { CreateChatDto } from '../dto/createChatDto';

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
    @GetUser() user: UserDto,
    @UploadedFile() file: Express.Multer.File,
    @Body('msg') msg,
  ) {
    this.logger.debug(`Called ${this.sendMessage.name}`);
    const createChatDto: CreateChatDto = {
      user,
      msg,
      imgUrl: file.path,
    };
    console.log('ChatDto::', createChatDto);
    console.log(file);
    return await this.chatService.create(createChatDto);
  }
}
