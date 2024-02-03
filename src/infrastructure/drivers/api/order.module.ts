import { Module } from '@nestjs/common';
import { OrderRouter } from './routes/order.router';
import QueueModule from 'src/infrastructure/drivers/queue';
import { MakeOrderWaitingPaymentConsumer } from 'src/presentation/checkout/consumers/make-order-waitingpayment.consumer';

@Module({
  imports: [QueueModule],
  controllers: [OrderRouter],
  providers: [MakeOrderWaitingPaymentConsumer],
})
export class OrderModule {}
