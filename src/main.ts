import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { json, raw } from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    setHeaders: (res) => res.setHeader('Access-Control-Allow-Origin', '*'),
  });
  app.use(json({ limit: '50mb', type: 'application/json' }));
  app.use(
    '/upload/raw',
    raw({ limit: '500mb', type: ['video/mp4', 'image/jpeg'] }),
  );
  app.enableCors();
  await app.listen(process.env.PORT || '3000');
}
bootstrap();
