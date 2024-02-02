import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategorySeederFactory } from './checkin/products';
import { EventProvider } from './@shared/event.provider';
import { env } from 'src/application/configs/env';

async function bootstrap() {
  console.time('Start app');
  const app = await NestFactory.create(AppModule);

  await CategorySeederFactory.init().seed();
  EventProvider.init();

  await app.listen(env.port);
  console.timeEnd('Start app');
}
bootstrap();
