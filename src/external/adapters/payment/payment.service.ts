import { Inject, Injectable } from '@nestjs/common';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { IOrder } from 'src/internal/domain/checkout/entities/order.entity';
import { Payment } from 'src/internal/domain/payment/entities/payment.entity';
import { IPaymentRepository } from 'src/internal/domain/payment/repositories/payment.repository';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepository')
    private paymentRepository: IPaymentRepository,
    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  // chamado pelo consumer de order.requested
  async create(order: IOrder) {
    const payment = new Payment({
      customerId: order.customerId,
      id: this.idGenerator.generate(),
      orderId: order.id,
      value: order.total,
    });

    await this.paymentRepository.create(payment);

    // comunicação com ACL de pagamento externo
    // dispara evento e fila para pagamento criado
  }

  make(id: string) {
    return 'This action adds a new payment' + id;
  }

  findOne(id: string) {
    return this.paymentRepository.findOne(id);
  }
}
