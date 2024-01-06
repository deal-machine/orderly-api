import EventEmitter from 'events';
import { Inject, Injectable } from '@nestjs/common';
import { IPaymentIntegration } from 'src/internal/application/ports/integrations/payment';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { IOrder } from 'src/internal/domain/checkout/entities/order.entity';
import { Payment } from 'src/internal/domain/payment/entities/payment.entity';
import { IPaymentRepository } from 'src/internal/domain/payment/repositories/payment.repository';
import { CreatedPaymentEvent } from 'src/internal/domain/payment/events/payment-created.event';
import { NotFoundException } from 'src/internal/application/errors';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private paymentRepository: IPaymentRepository,
    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
    @Inject('PaymentIntegration')
    private paymentIntegration: IPaymentIntegration,
    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(order: IOrder) {
    const payment = new Payment({
      customerId: order.customerId,
      id: this.idGenerator.generate(),
      orderId: order.id,
      value: order.total,
    });

    const integrationResult =
      await this.paymentIntegration.createPayment(payment);

    payment.updateQrCode(integrationResult.qrCode);
    payment.updateStatus('Pendente');

    await this.paymentRepository.create(payment);

    this.eventEmitter.emit('payment.created', new CreatedPaymentEvent(payment));
  }

  make(id: string) {
    return 'This action adds a new payment' + id;
  }

  async findOneByOrderId(orderId: string) {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');
    return payment;
  }
}
