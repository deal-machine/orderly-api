import { Module } from '@nestjs/common';
import { OrderRouter } from './routes/order.router';
import { OrderConsumePayment } from '../queue/consumers/payment.consumer';
import QueueModule from 'src/infrastructure/drivers/queue';

@Module({
  imports: [QueueModule],
  controllers: [OrderRouter],
  providers: [OrderConsumePayment],
})
export class OrderModule {}
