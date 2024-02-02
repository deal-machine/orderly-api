import { GetOrderStatusUseCase } from 'src/application/usecases/checkout';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import {
  GetOrderStatusController,
  IGetOrderStatusController,
} from 'src/presentation/checkout/controllers/get-orderstatus.controller';

export class GetOrderStatusFactory {
  static register(): IGetOrderStatusController {
    const orderRepository = new OrderSequelizeRepository();

    const getOrderStatusUseCase = new GetOrderStatusUseCase(orderRepository);

    return new GetOrderStatusController(getOrderStatusUseCase);
  }
}
