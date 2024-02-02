import { FindOrdersUseCase } from 'src/application/usecases/checkout';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import {
  FindOrdersController,
  IFindOrdersController,
} from 'src/presentation/checkout/controllers/find-orders.controller';

export class FindOrdersFactory {
  static register(): IFindOrdersController {
    const orderRepository = new OrderSequelizeRepository();

    const findOrdersUseCase = new FindOrdersUseCase(orderRepository);

    return new FindOrdersController(findOrdersUseCase);
  }
}
