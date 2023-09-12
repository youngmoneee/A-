import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { MqttGateway } from './mqtt.gateway';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma.service';
import { DevicePrismaImpl } from './repository/prismaImpl';

const Repository = {
  provide: 'Repository',
  useClass: DevicePrismaImpl,
};
@Module({
  imports: [ConfigModule],
  controllers: [MqttController],
  providers: [MqttService, MqttGateway, PrismaService, Repository],
})
export class MqttModule {}
