import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['src/config/.prod.env'],
      isGlobal: true,
    }),
  ],
})
export class ProdConfigModule {}
