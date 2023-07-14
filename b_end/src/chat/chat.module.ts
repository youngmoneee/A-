import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from '../dto/createChatDto';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { ChatGateway } from './chat.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chat.name,
        schema: ChatSchema,
      },
    ]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get('UPLOAD_DEST'),
          filename: (req, file, cb) => {
            const base = file.originalname.substring(
              0,
              file.originalname.lastIndexOf('.'),
            );
            const ext = file.originalname.substring(
              file.originalname.lastIndexOf('.'),
            );
            //  unique fileName
            const fileName = `${base}-${uuidv4()}${ext}`;
            cb(null, fileName);
          },
        }),
      }),
    }),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
