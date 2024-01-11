import { AttributeException, DomainException } from 'src/application/errors';
import { IOrderItem } from './order-item.entity';
import { orderStatusDto } from '../dto/order-status.dto';

export interface IOrder {
  id: string;
  customerId: string;
  total: number;
  status: orderStatusDto;
  orderItems: Array<IOrderItem>;
  createdAt: Date;
  updatedAt: Date;
}
type IConstructorDto = Omit<
  IOrder,
  'total' | 'status' | 'createdAt' | 'updatedAt'
>;

export class Order implements IOrder {
  id: string;
  customerId: string;
  total: number;
  status: orderStatusDto;
  orderItems: Array<IOrderItem>;
  createdAt: Date;
  updatedAt: Date;

  constructor(order: IConstructorDto) {
    this.validate(order);

    this.id = order.id;
    this.customerId = order.customerId;
    this.orderItems = order.orderItems;
    this.status = 'Recebido';
    this.total = this.sumTotal(this.orderItems);
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  private validate(order: IConstructorDto) {
    if (!order.id) throw new AttributeException('id not found.');

    if (!order.customerId) throw new DomainException('customerId is required.');

    if (order.orderItems.length < 1)
      throw new DomainException('items are required.');
  }

  private sumTotal(orderItems: Array<IOrderItem>) {
    return orderItems.reduce((prev, curr) => prev + curr.total, 0);
  }

  updateStatus(status: orderStatusDto) {
    this.updatedAt = new Date();
    this.status = status;
  }

  setUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
}
