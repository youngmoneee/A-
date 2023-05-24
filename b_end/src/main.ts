import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

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
  const corsOptions: CorsOptions = {
    origin: app.get(ConfigService).get('FE_HOST'),
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type',
    credentials: true,
  };
  app.enableCors(corsOptions);
  await app.listen(app.get(ConfigService).get('BE_PORT'));
  console.log(app.get(ConfigService).get('BE_PORT'));
}
bootstrap();
