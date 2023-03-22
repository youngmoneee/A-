import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DevConfigModule } from './config/dev.config.module';

@Module({
  imports: [UserModule, DevConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
