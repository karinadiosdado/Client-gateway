import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config/envs.js';
import { AppModule } from './app.module.js';
import { RpcCustomExceptionFilter } from './common/index.js';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
   app.useGlobalFilters(new RpcCustomExceptionFilter());
  await app.listen(envs.port);

  logger.log(`Gateway running on port ${envs.port}`);
}

await bootstrap();