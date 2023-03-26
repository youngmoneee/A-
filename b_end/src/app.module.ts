import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DevConfigModule } from './config/dev.config.module';
import { AuthModule } from './auth/auth.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [UserModule, DevConfigModule, AuthModule, MqttModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
