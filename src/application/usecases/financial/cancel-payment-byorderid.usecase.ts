import { NotFoundException } from 'src/application/errors';
import { IEventDispatcher } from 'src/application/ports/events';
import { DomainException } from 'src/domain/@shared/errors';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { ChangedPaymentStatusEvent } from 'src/domain/financial/events/payment-status-changed.event';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import { ICancelPaymentByOrderIdUseCase } from 'src/domain/financial/usecases/cancel-payment-byorderid.usecase';

export class CancelPaymentByOrderIdUseCase
  implements ICancelPaymentByOrderIdUseCase
{
  constructor(
    private paymentRepository: IPaymentRepository,
    private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(orderId: string): Promise<void> {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');

    if (payment.status === 'Aprovado')
      throw new DomainException('payment was approved');

    console.log('Canceling...');
    setTimeout(() => {
      this.eventDispatcher.dispatch(
        new ChangedPaymentStatusEvent({
          paymentId: payment.id,
          status: 'Cancelado',
        }),
      );
      this.eventDispatcher.dispatch(
        new ChangedOrderStatusEvent({
          orderId,
          status: 'Cancelado',
        }),
      );
      console.log('Cancelled.');
    }, 20000);
  }
}
