import { Module } from '@nestjs/common';
import { ConfigModule as Conf } from '@nestjs/config';

@Module({
  imports: [
    Conf.forRoot({
      envFilePath: ['.env', './dev.env', './prod.env'],
      isGlobal: true,
    }),
  ],
  exports: [Conf],
})
export class ConfigModule {}
