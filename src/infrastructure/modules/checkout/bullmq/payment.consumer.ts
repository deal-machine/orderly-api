import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';
import { Inject } from '@nestjs/common';
import { IPayOrderUseCase } from 'src/domain/checkout/usecases/pay-order.usecase';

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

      await this.payOrderUseCase.execute({
        orderId: payment.orderId,
        status: payment.status,
      });
    } catch (err: any) {
      console.error(`\n OrderConsumePayment: ${err.message}`);
    }
  }
}
