import {
  Body,
  Controller,
  HttpStatus,
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
import { JwtGuard } from '../auth/guard/jwt.guard';
import { ChatGateway } from './chat.gateway';
import { Chat } from '../dto/createChatDto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Chatting')
@Controller('chat')
@UseGuards(JwtGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly chatGateway: ChatGateway,
  ) {}
  logger = new Logger(ChatController.name);
  //@Get()
  async findAll() {
    this.logger.debug(`Called ${this.findAll.name}`);
    return await this.chatService.findAll();
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: '채팅 전송',
    description:
      '파일을 함께 보냈다면 서버 스토리지에 저장 후, 메세지와 파일 Url을 Socket.io로 Pub',
  })
  @ApiBody({ description: '메세지 본문', type: Chat })
  @ApiCreatedResponse({
    description: '성공적으로 전송됨',
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async sendMessage(
    @Req() req: Request,
    @GetUser() user: UserDto,
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
    await this.chatGateway.publish(res);
    return HttpStatus.CREATED;
  }
}
