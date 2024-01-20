import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/application/errors';
import { IEventEmitter } from 'src/application/ports/events/event-emitter';
import { DomainException } from 'src/domain/@shared/errors';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { ChangedPaymentStatusEvent } from 'src/domain/financial/events/payment-status-changed.event';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import { IApprovePaymentByOrderIdUseCase } from 'src/domain/financial/usecases/approve-payment-byorderid.usecase';

@Injectable()
export class ApprovePaymentByOrderIdUseCase
  implements IApprovePaymentByOrderIdUseCase
{
  constructor(
    @Inject('PaymentRepository')
    private paymentRepository: IPaymentRepository,
    @Inject('EventEmitter')
    private eventEmitter: IEventEmitter,
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
      this.eventEmitter.emit(
        'payment-status.changed',
        new ChangedPaymentStatusEvent({
          paymentId: payment.id,
          status: 'Aprovado',
        }),
      );
      this.eventEmitter.emit(
        'order-status.changed',
        new ChangedOrderStatusEvent({
          orderId,
          status: 'Pago',
        }),
      );

      console.log('Paid.');
    }, 20000);
  }
}
