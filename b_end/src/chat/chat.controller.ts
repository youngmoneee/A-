import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatService } from './chat.service';
import { UserDto } from '../dto/user.dto';
import { GetToken } from '../auth/auth.decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ChatGateway } from './chat.gateway';
import { Chat } from '../dto/createChatDto';

@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}
  logger = new Logger(ChatController.name);
  @Get()
  async findAll() {
    this.logger.debug(`Called ${this.findAll.name}`);
    return await this.chatService.findAll();
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async sendMessage(
    @Req() req: Request,
    @GetUser() user: UserDto,
    @GetToken() token: string,
    @UploadedFile() file?: Express.Multer.File,
    @Body('msg') msg?: string,
  ) {
    this.logger.debug(`Called ${this.sendMessage.name}`);
    const chatSchema: Chat = {
      createdAt: new Date(),
      user,
      msg,
      fileUrl: file?.path,
    };
    const res = await this.chatService.create(chatSchema);
    this.chatGateway.publish(res);
  }
}
