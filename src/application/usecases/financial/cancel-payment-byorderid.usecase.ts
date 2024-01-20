import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/application/errors';
import { IEventEmitter } from 'src/application/ports/events/event-emitter';
import { DomainException } from 'src/domain/@shared/errors';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { ChangedPaymentStatusEvent } from 'src/domain/financial/events/payment-status-changed.event';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import { ICancelPaymentByOrderIdUseCase } from 'src/domain/financial/usecases/cancel-payment-byorderid.usecase';

@Injectable()
export class CancelPaymentByOrderIdUseCase
  implements ICancelPaymentByOrderIdUseCase
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

    console.log('Canceling...');

    if (payment.status === 'Aprovado')
      throw new DomainException('payment was approved');

    setTimeout(() => {
      this.eventEmitter.emit(
        'payment-status.changed',
        new ChangedPaymentStatusEvent({
          paymentId: payment.id,
          status: 'Cancelado',
        }),
      );
      this.eventEmitter.emit(
        'order-status.changed',
        new ChangedOrderStatusEvent({
          orderId,
          status: 'Cancelado',
        }),
      );
      console.log('Cancelled.');
    }, 20000);
  }
}
