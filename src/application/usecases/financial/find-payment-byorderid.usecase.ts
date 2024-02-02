import { NotFoundException } from 'src/application/errors';
import { Payment } from 'src/domain/financial/entities/payment.entity';
import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import { IFindPaymentByOrderIdUseCase } from 'src/domain/financial/usecases/find-payment-byorderid.usecase';

export class FindPaymentByOrderIdUseCase
  implements IFindPaymentByOrderIdUseCase
{
  constructor(private paymentRepository: IPaymentRepository) {}

  async execute(orderId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOneByOrderId(orderId);
    if (!payment) throw new NotFoundException('payment not found');
    return payment;
  }
}
