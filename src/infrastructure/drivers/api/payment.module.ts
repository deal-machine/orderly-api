import { Module } from '@nestjs/common';
import { PaymentRouter } from './routes/payment.router';
import QueueModule from 'src/infrastructure/drivers/queue';
import { CreatePaymentConsumer } from 'src/presentation/financial/consumers/create-payment.consumer';

@Module({
  imports: [QueueModule],
  controllers: [PaymentRouter],
  providers: [CreatePaymentConsumer],
})
export class PaymentModule {}
