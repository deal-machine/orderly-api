import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/application/errors';
import { Payment } from 'src/domain/financial/entities/payment.entity';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import { IFindPaymentByOrderId } from 'src/domain/financial/usecases/find-payment-byorderid.usecase';

@Injectable()
export class FindPaymentByOrderId implements IFindPaymentByOrderId {
  constructor(
    @Inject('PaymentRepository')
    private paymentRepository: IPaymentRepository,
  ) {}

  async execute(orderId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');
    return payment;
  }
}
