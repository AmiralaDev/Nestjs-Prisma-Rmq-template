import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './providers/prisma/prisma.module';
import { PostsModule } from './components/posts/posts.module';
import { HealthModule } from './components/health/health.module';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import getPinoConfig from './configs/pino.config';
import { SentryModule } from './providers/sentry/sentry.module';
import getSentryConfig from './configs/sentry.config';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { RmqModule } from './providers/rmq/rmq.module';

@Module({
  imports: [
    PrismaModule,
    PostsModule,
    HealthModule,
    RmqModule,
    LoggerModule.forRoot(getPinoConfig()),
    ConfigModule.forRoot({ isGlobal: true }),
    SentryModule.forRoot(getSentryConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
