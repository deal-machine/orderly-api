import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { ICreatePaymentUseCase } from 'src/domain/financial/usecases/create-payment.usecase';

@Processor('payments')
export class PaymentConsumeOrder {
  constructor(
    @Inject('CreatePaymentUseCase')
    private readonly createPaymentUseCase: ICreatePaymentUseCase,
  ) {}

  @Process('payment.requested')
  async handle(job: Job<CreatedOrderEvent>) {
    try {
      const { order } = job.data;

      await this.createPaymentUseCase.execute({
        customerId: order.customerId,
        orderId: order.id,
        total: order.total,
      });
    } catch (err: any) {
      console.error('\n PaymentConsumeOrder: ', err.message);
    }
  }
}
