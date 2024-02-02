import { IEvent } from 'src/application/ports/events';
import { Payment } from '../entities/payment.entity';

export class CreatedPaymentEvent implements IEvent {
  dateTime: Date;
  name: string;
  data: any;
  constructor(public payment: Payment) {
    this.data = payment;
    this.name = 'CreatedPaymentEvent';
    this.dateTime = new Date();
  }
}
