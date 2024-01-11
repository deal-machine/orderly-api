import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OrdersService } from '../api/order.service';
import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';

@Processor('orders')
export class OrderConsumePayment {
  constructor(private readonly orderService: OrdersService) {}

  @Process('payment.created')
  async handle(job: Job<CreatedPaymentEvent>) {
    try {
      const { payment } = job.data;

      await this.orderService.pay(payment);
    } catch (err: any) {
      console.error(`\n OrderConsumePayment: ${err.message}`);
    }
  }
}
