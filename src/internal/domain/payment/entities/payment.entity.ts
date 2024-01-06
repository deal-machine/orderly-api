import {
  AttributeException,
  DomainException,
} from 'src/internal/application/errors';

export interface IPayment {
  id: string;
  customerId: string;
  orderId: string;
  value: number;
  paymentType: string;
  status: string;
  qrCode: string;
}
type IConstructorDto = Omit<IPayment, 'status' | 'qrCode' | 'paymentType'>;

export class Payment implements IPayment {
  id: string;
  customerId: string;
  orderId: string;
  value: number;
  paymentType: string;
  status: string;
  qrCode: string;

  constructor(payment: IConstructorDto) {
    this.validate(payment);

    this.id = payment.id;
    this.customerId = payment.customerId;
    this.orderId = payment.orderId;
    this.value = Number(payment.value);
    this.status = 'Criado';
    this.paymentType = 'pix';
  }

  private validate(payment: IConstructorDto) {
    if (!payment.id) throw new AttributeException('id not found.');

    if (!payment.customerId)
      throw new DomainException('customerId is required.');

    if (!payment.orderId) throw new DomainException('orderId is required.');

    if (payment.value <= 0)
      throw new AttributeException('value must be a positive number.');
  }

  updateStatus(status: string) {
    this.status = status;
  }

  updateQrCode(qrCode: string) {
    this.qrCode = qrCode;
  }
}
