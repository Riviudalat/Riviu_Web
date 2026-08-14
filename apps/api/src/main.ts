import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module';
import { UPLOAD_DIR } from './media/media.controller';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: true });
  app.set('trust proxy', true);
  // sendBeacon gửi text/plain để tránh CORS preflight — parse thủ công trong controller
  app.use(express.text({ type: 'text/plain' }));
  // Ảnh upload từ admin editor
  app.useStaticAssets(UPLOAD_DIR, { prefix: '/api/uploads' });
  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
