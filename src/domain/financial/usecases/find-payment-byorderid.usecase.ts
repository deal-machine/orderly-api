import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { Payment } from '../entities/payment.entity';

export interface IFindPaymentByOrderIdUseCase
  extends IUseCase<string, Payment> {
  execute(orderId: string): Promise<Payment>;
}
