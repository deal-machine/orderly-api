import { NotFoundException } from 'src/application/errors';
import { IEventDispatcher } from 'src/application/ports/events';
import { DomainException } from 'src/domain/@shared/errors';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { ChangedPaymentStatusEvent } from 'src/domain/financial/events/payment-status-changed.event';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import { IApprovePaymentByOrderIdUseCase } from 'src/domain/financial/usecases/approve-payment-byorderid.usecase';

export class ApprovePaymentByOrderIdUseCase
  implements IApprovePaymentByOrderIdUseCase
{
  constructor(
    private paymentRepository: IPaymentRepository,
    private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(orderId: string): Promise<void> {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');

    if (payment.status !== 'Pendente de pagamento') {
      // podera verificar o status com o integrador de meio de pagamentos
      throw new DomainException(
        `payment cannot be approved, current status: ${payment.status}`,
      );
    }
    console.log('Paying...');

    setTimeout(() => {
      this.eventDispatcher.dispatch(
        new ChangedPaymentStatusEvent({
          paymentId: payment.id,
          status: 'Aprovado',
        }),
      );
      this.eventDispatcher.dispatch(
        new ChangedOrderStatusEvent({
          orderId,
          status: 'Pago',
        }),
      );

      console.log('Paid.');
    }, 20000);
  }
}
