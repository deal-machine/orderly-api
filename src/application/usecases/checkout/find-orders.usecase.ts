import { Order } from 'src/domain/checkout/entities/order.entity';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import {
  IFindOrdersInput,
  IFindOrdersUseCase,
} from 'src/domain/checkout/usecases/find-orders.usecase';

export class FindOrdersUseCase implements IFindOrdersUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute({ customerId, status }: IFindOrdersInput): Promise<Order[]> {
    return this.orderRepository.findAll(customerId, status);
  }
}
