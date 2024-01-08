import EventEmitter from 'events';
import { Inject, Injectable } from '@nestjs/common';
import { IPaymentIntegration } from 'src/internal/application/ports/integrations/payment';
import { IOrder } from 'src/internal/domain/checkout/entities/order.entity';
import { Payment } from 'src/internal/domain/payment/entities/payment.entity';
import { IPaymentRepository } from 'src/internal/domain/payment/repositories/payment.repository';
import { CreatedPaymentEvent } from 'src/internal/domain/payment/events/payment-created.event';
import {
  DomainException,
  NotFoundException,
} from 'src/internal/application/errors';
import { ChangedPaymentStatusEvent } from 'src/internal/domain/payment/events/payment-status-changed.event';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private paymentRepository: IPaymentRepository,
    @Inject('PaymentIntegration')
    private paymentIntegration: IPaymentIntegration,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(order: IOrder) {
    const { id, qrCode, status } = await this.paymentIntegration.createPayment({
      value: order.total,
      paymentType: 'pix',
    });

    const payment = new Payment({
      id: String(id),
      customerId: order.customerId,
      orderId: order.id,
      value: order.total,
    });
    payment.setQrCode(qrCode);

    if (status !== 'pending')
      throw new DomainException('transaction was cancelled');

    payment.changeStatus('Pendente de pagamento');

    await this.paymentRepository.create(payment);

    this.eventEmitter.emit('payment.created', new CreatedPaymentEvent(payment));
  }

  async approveByOrderId(orderId: string) {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');

    console.log('Paying...');
    await this.paymentIntegration.updatePayment(payment, 'approved');

    this.eventEmitter.emit(
      'payment-status.changed',
      new ChangedPaymentStatusEvent({
        paymentId: payment.id,
        status: 'Aprovado',
      }),
    );
    console.log('Paid.');
  }

  async cancelByOrderId(orderId: string) {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');

    console.log('Canceling...');
    await this.paymentIntegration.updatePayment(payment, 'cancelled');
    this.eventEmitter.emit(
      'payment-status.changed',
      new ChangedPaymentStatusEvent({
        paymentId: payment.id,
        status: 'Cancelado',
      }),
    );
    console.log('Cancelled.');
  }

  async findOneByOrderId(orderId: string) {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');
    return payment;
  }
}
