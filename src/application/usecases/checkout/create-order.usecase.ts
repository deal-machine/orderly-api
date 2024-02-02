import { IEventDispatcher } from 'src/application/ports/events';
import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';
import { OrderItem } from 'src/domain/checkout/entities/order-item.entity';
import { Order } from 'src/domain/checkout/entities/order.entity';
import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import { ICreateOrderUseCase } from 'src/domain/checkout/usecases/create-order.usecase';

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private eventDispatcher: IEventDispatcher,
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

    await this.orderRepository.create(order);

    this.eventDispatcher.dispatch(new CreatedOrderEvent(order));

    return order;
  }
}
