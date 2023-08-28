import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { PrismaService } from './prisma.service';
import { BugModule } from './bug/bug.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'prod' ? undefined : 'src/config/.dev.env',
    }),
    UserModule,
    AuthModule,
    MqttModule,
    ChatModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri:
          'mongodb://' +
          configService.get<string>('MONGO_HOST') +
          ':' +
          configService.get('MONGO_PORT'),
      }),
    }),
    BugModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
