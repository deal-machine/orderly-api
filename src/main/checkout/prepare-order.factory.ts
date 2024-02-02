import { PrepareOrderUseCase } from 'src/application/usecases/checkout';
import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import {
  IPrepareOrderController,
  PrepareOrderController,
} from 'src/presentation/checkout/controllers/prepare-order.controller';

export class PrepareOrderFactory {
  static register(): IPrepareOrderController {
    const orderRepository = new OrderSequelizeRepository();

    const prepareOrderUseCase = new PrepareOrderUseCase(
      orderRepository,
      EventDispatcher.getInstance(),
    );

    return new PrepareOrderController(prepareOrderUseCase);
  }
}
