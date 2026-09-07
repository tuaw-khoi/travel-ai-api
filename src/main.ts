import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from '~/config/cor.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);

  const port = Number(process.env.PORT || process.env.APP_PORT || 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
