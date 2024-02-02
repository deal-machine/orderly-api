import { IEventHandler } from 'src/application/ports/events';
import { ChangedPaymentStatusEvent } from 'src/domain/financial/events/payment-status-changed.event';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';

export class ChangePaymentStatusHandler implements IEventHandler {
  constructor(private paymentRepository: IPaymentRepository) {}

  async handle(event: ChangedPaymentStatusEvent) {
    const { paymentId, status } = event.data;
    await this.paymentRepository.changeStatus(paymentId, status);
  }
}
