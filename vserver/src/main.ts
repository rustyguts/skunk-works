import * as dotenv from 'dotenv';
dotenv.config();

import * as morgan from 'morgan';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ProfilingIntegration } from '@sentry/profiling-node';
import { ErrorRequestHandler, RequestHandler } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(`Sentry DSN Found: ${process.env.SENTRY_DSN ? 'Yes' : 'No'}`);
  Sentry.init({
    dsn: process.env.SENTRY_DSN || '',
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new ProfilingIntegration(),
    ],
  });

  app.use(morgan('combined'));
  app.use(Sentry.Handlers.requestHandler() as RequestHandler);
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler() as ErrorRequestHandler);

  await app.listen(5000);
}
bootstrap();
