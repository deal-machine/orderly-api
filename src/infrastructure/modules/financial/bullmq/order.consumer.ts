import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PaymentService } from '../api/payment.service';
import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';

@Processor('payments')
export class PaymentConsumeOrder {
  constructor(private readonly paymentService: PaymentService) {}

  @Process('payment.requested')
  async handle(job: Job<CreatedOrderEvent>) {
    try {
      const { order } = job.data;

      await this.paymentService.create(order);
    } catch (err: any) {
      console.log(err);
      console.error('\n PaymentConsumeOrder: ', err.message);
    }
  }
}
