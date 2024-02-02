import { IEvent } from 'src/application/ports/events';
import { paymentStatusDto } from '../dto/payment-status.dto';

type IConstructorDto = {
  paymentId: string;
  status: paymentStatusDto;
};

export class ChangedPaymentStatusEvent implements IEvent {
  name: string;
  dateTime: Date;
  constructor(public data: IConstructorDto) {
    this.name = 'ChangedPaymentStatusEvent';
    this.dateTime = new Date();
  }
}
