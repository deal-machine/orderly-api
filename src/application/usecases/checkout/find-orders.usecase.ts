import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/domain/checkout/entities/order.entity';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import {
  IFindOrdersInput,
  IFindOrdersUseCase,
} from 'src/domain/checkout/usecases/find-orders.usecase';

@Injectable()
export class FindOrdersUseCase implements IFindOrdersUseCase {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute({ customerId, status }: IFindOrdersInput): Promise<Order[]> {
    return this.orderRepository.findAll(customerId, status);
  }
}
