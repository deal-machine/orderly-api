import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

export interface ICreateOrderUseCase extends IUseCase<CreateOrderDto, Order> {
  execute(createOrderDto: CreateOrderDto): Promise<Order>;
}
