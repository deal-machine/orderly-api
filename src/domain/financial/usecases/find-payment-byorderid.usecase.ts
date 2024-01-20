import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { Payment } from '../entities/payment.entity';

export interface IFindPaymentByOrderId extends IUseCase<string, Payment> {
  execute(orderId: string): Promise<Payment>;
}
