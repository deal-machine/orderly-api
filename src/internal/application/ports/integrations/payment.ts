import { IPayment } from 'src/internal/domain/payment/entities/payment.entity';

export interface IPaymentResult {
  id: string;
  status: string;
  qrCode: string;
}

export interface IPaymentIntegration {
  createPayment(payment: IPayment): Promise<IPaymentResult>;
}
