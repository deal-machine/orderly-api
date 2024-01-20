import { Job } from 'bull';
import { Inject } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { IPayOrderUseCase } from 'src/domain/checkout/usecases/pay-order.usecase';
import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';

@Processor('orders')
export class OrderConsumePayment {
  constructor(
    @Inject('PayOrderUseCase')
    private readonly payOrderUseCase: IPayOrderUseCase,
  ) {}

  @Process('payment.created')
  async handle(job: Job<CreatedPaymentEvent>) {
    try {
      const { payment } = job.data;

      await this.payOrderUseCase.execute(payment.orderId);
    } catch (err: any) {
      console.error(`\n OrderConsumePayment: ${err.message}`);
    }
  }
}
