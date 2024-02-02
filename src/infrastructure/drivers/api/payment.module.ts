import { Module } from '@nestjs/common';
import { PaymentRouter } from './routes/payment.router';
import { PaymentConsumeOrder } from '../queue/consumers/order.consumer';
import QueueModule from 'src/infrastructure/drivers/queue';

@Module({
  imports: [QueueModule],
  controllers: [PaymentRouter],
  providers: [PaymentConsumeOrder],
})
export class PaymentModule {}
