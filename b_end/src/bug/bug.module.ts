import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BugController } from './bug.controller';
import { BugService } from './bug.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [BugController],
  providers: [BugService],
})
export class BugModule {}
