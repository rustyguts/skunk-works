import * as dotenv from 'dotenv';
dotenv.config();

import * as morgan from 'morgan';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  Sentry.init({
    dsn: process.env.SENTRY_DSN || '',

    // Performance Monitoring
    tracesSampleRate: 0.2, // Capture 100% of the transactions, reduce in production!
  });

  await app.listen(5000);
}
bootstrap();
