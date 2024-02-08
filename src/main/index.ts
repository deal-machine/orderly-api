import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CategorySeederFactory } from './checkin/products';
import { EventProvider } from './@shared/event.provider';
import { env } from 'src/application/configs/env';
import { QueueProvider } from './@shared/rabbitmq.provider';

async function bootstrap() {
  console.time('Start app');

  const app = await NestFactory.create(AppModule);
  await app.listen(env.port);

  await CategorySeederFactory.init().seed();

  const queueAdapter = await QueueProvider.init();
  EventProvider.init(queueAdapter);

  console.timeEnd('Start app');
}
bootstrap();
