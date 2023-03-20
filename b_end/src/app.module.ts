import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevConfigModule } from './config/dev.config.module';

@Module({
  imports: [DevConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
