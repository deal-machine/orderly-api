import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from 'src/internal/domain/payment/entities/payment.entity';
import { IPaymentRepository } from 'src/internal/domain/payment/repositories/payment.repository';
import { PaymentModel } from './payment-model';

@Injectable()
export class PaymentSequelizeRepository implements IPaymentRepository {
  constructor(
    @InjectModel(PaymentModel)
    private paymentModel: typeof PaymentModel,
  ) {}

  async findOne(id: string): Promise<Payment> {
    throw new Error(`Method not implemented. ${id}`);
  }
  findAll(): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }
  create(params: Partial<Payment>): Promise<void | Payment> {
    throw new Error(`Method not implemented. ${params}`);
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  update(id: string, params: Partial<Payment>): Promise<void> {
    throw new Error(`Method not implemented. ${id} + ${params}`);
  }
}
