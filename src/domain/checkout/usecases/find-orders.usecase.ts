import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { Order } from '../entities/order.entity';

export interface IFindOrdersInput {
  customerId?: string;
  status?: string;
}

export interface IFindOrdersUseCase
  extends IUseCase<IFindOrdersInput, Order[]> {
  execute(input: IFindOrdersInput): Promise<Order[]>;
}
