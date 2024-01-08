import { IPayment } from 'src/internal/domain/payment/entities/payment.entity';

export interface IPaymentCreateResult {
  id: string;
  status: string;
  qrCode: string;
}

export interface IPaymentIntegration {
  createPayment(payment: Partial<IPayment>): Promise<IPaymentCreateResult>;
  updatePayment(payment: IPayment, status: string): Promise<any>;
}
