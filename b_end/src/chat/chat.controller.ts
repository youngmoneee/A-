import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from '../user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('chat')
export class ChatController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async sendMessage(
    @GetUser() sender: string,
    @UploadedFile() files,
    @Body() msg,
  ) {
    console.log('Sender::', sender);
    console.log('File::', files);
    console.log('Message::', msg);
  }
}
