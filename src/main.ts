import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import getSwaggerConfig from './configs/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import getHelmetConfig from './configs/helmet.config';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const config: ConfigService = app.get(ConfigService);
  const { httpAdapter } = app.get(HttpAdapterHost);
  // Config the App
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.enableCors();
  app.use(helmet(getHelmetConfig()));

  // SWAGGER Configuration
  if (config.get<string>('SWAGGER_EXPOSE') == 'true') {
    const document = SwaggerModule.createDocument(app, getSwaggerConfig());
    SwaggerModule.setup('/docs', app, document);
  }
  // LISTEN
  const port: number = config.get<number>('PORT') || 3000;
  await app.listen(port, () => {
    app.get(Logger).log(`[+] Application is ready at localhost:${port}`);
  });
}
bootstrap();
