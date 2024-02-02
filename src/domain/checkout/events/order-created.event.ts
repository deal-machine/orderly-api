import { IEvent } from 'src/application/ports/events';
import { Order } from '../entities/order.entity';

export class CreatedOrderEvent implements IEvent {
  dateTime: Date;
  name: string;
  data: any;

  constructor(public order: Order) {
    this.data = order;
    this.dateTime = new Date();
    this.name = 'CreatedOrderEvent';
  }
}
