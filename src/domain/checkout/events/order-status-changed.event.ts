import { IEvent } from 'src/application/ports/events';
import { orderStatusDto } from '../dto/order-status.dto';

type IConstructorDto = {
  orderId: string;
  status: orderStatusDto;
};

export class ChangedOrderStatusEvent implements IEvent {
  dateTime: Date;
  name: string;
  constructor(public data: IConstructorDto) {
    this.dateTime = new Date();
    this.name = 'ChangedOrderStatusEvent';
  }
}
