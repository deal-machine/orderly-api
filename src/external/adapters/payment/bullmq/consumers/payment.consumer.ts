import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatedOrderEvent } from 'src/internal/domain/checkout/events/order-created.event';
import { PaymentService } from '../../payment.service';

@Processor('orders')
export class PaymentConsumer {
  constructor(private readonly paymentService: PaymentService) {}

  @Process('order.requested')
  async handle(job: Job<CreatedOrderEvent>) {
    const { order } = job.data;

    await this.paymentService.create(order);
  }

  @OnQueueFailed({ name: 'order.requested' })
  handleError(error: Error) {
    console.error(`\n PaymentConsumer: ${error}`);
  }
}
