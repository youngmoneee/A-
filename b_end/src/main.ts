import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiConfig = new DocumentBuilder()
    .setTitle('A-')
    .setDescription('Api Documentaion')
    .setVersion('1.0')
    .setContact('youngmon', '/', 'zsh@duck.com')
    .build();
  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, apiConfig),
  );
  await app.listen(3000);
}
bootstrap();
