import { IRepository } from 'src/internal/application/ports/repositories/repository';
import { Payment } from '../entities/payment.entity';

export interface IPaymentRepository extends IRepository<Payment> {
  findOneByOrderId(orderId: string): Promise<Payment | null>;
}
