import { Inject, Injectable } from '@nestjs/common';
import { IEventEmitter } from 'src/application/ports/events/event-emitter';
import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';
import { OrderItem } from 'src/domain/checkout/entities/order-item.entity';
import { Order } from 'src/domain/checkout/entities/order.entity';
import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { ICreateOrderUseCase } from 'src/domain/checkout/usecases/create-order.usecase';

@Injectable()
export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    @Inject('EventEmitter')
    private eventEmitter: IEventEmitter,

    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  async execute(createOrderDto: CreateOrderDto): Promise<Order> {
    const products = createOrderDto.products;

    const orderItems = products.map((product) => {
      return new OrderItem({
        id: this.idGenerator.generate(),
        productId: product.id,
        quantity: product.quantity,
        value: product.price,
      });
    });
    const order = new Order({
      customerId: createOrderDto.customerId,
      id: this.idGenerator.generate(),
      orderItems,
    });

    this.eventEmitter.emit('order.created', new CreatedOrderEvent(order));

    return order;
  }
}
