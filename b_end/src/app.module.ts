import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DevConfigModule } from './config/dev.config.module';
import { AuthModule } from './auth/auth.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MqttService } from './mqtt/mqtt.service';

@Module({
  imports: [
    UserModule,
    DevConfigModule,
    AuthModule,
    MqttModule,
    ChatModule,
    MongooseModule.forRoot('mongodb://mongo:27017'),
  ],
  controllers: [AppController],
  providers: [AppService, MqttService],
})
export class AppModule {}
