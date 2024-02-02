import { IEvent } from 'src/application/ports/events';

type productDto = {
  id: string;
  quantity: number;
  value: number;
};

export class ProductDecreasedEvent implements IEvent {
  dateTime: Date;
  name: string;
  data: any;
  constructor(public product: productDto[]) {
    this.data = product;
    this.dateTime = new Date();
    this.name = 'ProductDecreasedEvent';
  }
}
