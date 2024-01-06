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

  async findOneByOrderId(orderId: string): Promise<Payment | null> {
    const payment = await this.paymentModel.findOne({ where: { orderId } });
    if (!payment) return null;
    const paymentEntity = new Payment({
      id: payment.id,
      customerId: payment.customerId,
      orderId: payment.orderId,
      value: payment.value,
    });
    paymentEntity.updateQrCode(payment.qrCode);
    paymentEntity.updateStatus(payment.status);
    return paymentEntity;
  }

  async findOne(id: string): Promise<Payment> {
    throw new Error(`Method not implemented. ${id}`);
  }

  findAll(): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }

  async create(params: Partial<Payment>): Promise<void | Payment> {
    await this.paymentModel.create({
      id: params.id,
      customerId: params.customerId,
      orderId: params.orderId,
      value: params.value,
      paymentType: params.paymentType,
      status: params.status,
      qrCode: params.qrCode,
    });
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  update(id: string, params: Partial<Payment>): Promise<void> {
    throw new Error(`Method not implemented. ${id} + ${params}`);
  }
}
