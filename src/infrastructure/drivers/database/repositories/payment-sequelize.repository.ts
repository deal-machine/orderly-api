import { IPaymentRepository } from 'src/domain/financial/repositories/payment.repository';
import { Payment } from 'src/domain/financial/entities/payment.entity';
import { paymentStatusDto } from 'src/domain/financial/dto/payment-status.dto';
import { PaymentModel } from '../models/payment-model';

export class PaymentSequelizeRepository implements IPaymentRepository {
  async changeStatus(paymentId: string, status: string): Promise<void> {
    await PaymentModel.update({ status }, { where: { id: paymentId } });
  }

  async findOneByOrderId(orderId: string): Promise<Payment | null> {
    const payment = await PaymentModel.findOne({ where: { orderId } });
    if (!payment) return null;
    const paymentEntity = new Payment({
      id: payment.id,
      customerId: payment.customerId,
      orderId: payment.orderId,
      value: payment.value,
    });
    paymentEntity.setQrCode(payment.qrCode);
    paymentEntity.setUrl(payment.url);
    paymentEntity.changeStatus(payment.status as paymentStatusDto);
    return paymentEntity;
  }

  async findOne(id: string): Promise<Payment> {
    throw new Error(`Method not implemented. ${id}`);
  }

  findAll(): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }

  async create(params: Partial<Payment>): Promise<void | Payment> {
    await PaymentModel.create({
      id: params.id,
      customerId: params.customerId,
      orderId: params.orderId,
      value: params.value,
      paymentType: params.paymentType,
      status: params.status,
      qrCode: params.qrCode,
      url: params.url,
    });
  }
  delete(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  update(id: string, params: Partial<Payment>): Promise<void> {
    throw new Error(`Method not implemented. ${id} + ${params.id}`);
  }
}
