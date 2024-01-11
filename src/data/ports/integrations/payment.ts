import { IPayment } from 'src/domain/financial/entities/payment.entity';

export interface IPaymentResult {
  id: string;
  status: string;
  qrCode: string;
  url: string;
}

export interface IPaymentIntegration {
  createPayment(payment: Partial<IPayment>): Promise<IPaymentResult>;
  updatePayment(payment: IPayment, status: string): Promise<IPaymentResult>;
  getPayment(paymentId: string): Promise<IPaymentResult>;
}
