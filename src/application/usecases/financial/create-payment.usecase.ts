import { IEventDispatcher } from 'src/application/ports/events';
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

export class CreatePaymentUseCase implements ICreatePaymentUseCase {
  constructor(
    private paymentRepository: IPaymentRepository,
    private paymentIntegration: IPaymentIntegration,
    private eventDispatcher: IEventDispatcher,
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

    this.eventDispatcher.dispatch(new CreatedPaymentEvent(payment));
  }
}
