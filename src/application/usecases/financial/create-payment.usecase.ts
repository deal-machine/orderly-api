import { Inject, Injectable } from '@nestjs/common';
import { IEventEmitter } from 'src/application/ports/events/event-emitter';
import { IPaymentIntegration } from 'src/application/ports/integrations/payment';
import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { DomainException } from 'src/domain/@shared/errors';
import { Payment } from 'src/domain/financial/entities/payment.entity';
import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import {
  ICreatePaymentUseCase,
  ICreatePaymentInput,
} from 'src/domain/financial/usecases/create-payment.usecase';

@Injectable()
export class CreatePaymentUseCase implements ICreatePaymentUseCase {
  constructor(
    @Inject('PaymentRepository')
    private paymentRepository: IPaymentRepository,
    @Inject('PaymentIntegration')
    private paymentIntegration: IPaymentIntegration,
    @Inject('EventEmitter')
    private eventEmitter: IEventEmitter,
    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  async execute({
    customerId,
    orderId,
    total,
  }: ICreatePaymentInput): Promise<any> {
    const payment = new Payment({
      id: this.idGenerator.generate(),
      customerId,
      orderId,
      value: total,
    });

    const { qrCode, status, url } = await this.paymentIntegration.createPayment(
      {
        value: payment.value,
        paymentType: 'pix',
      },
    );
    if (status !== 'pending')
      throw new DomainException('payment was cancelled');

    payment.setQrCode(qrCode);
    payment.setUrl(url);
    payment.changeStatus('Pendente de pagamento');

    await this.paymentRepository.create(payment);

    this.eventEmitter.emit('payment.created', new CreatedPaymentEvent(payment));
  }
}
