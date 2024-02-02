import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { WithdrawnOrderUseCase } from 'src/application/usecases/checkout';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';

import {
  IWithdrawnOrderController,
  WithdrawnOrderController,
} from 'src/presentation/checkout/controllers/withdrawn-order.controller';

export class WithdrawnOrderFactory {
  static register(): IWithdrawnOrderController {
    const orderRepository = new OrderSequelizeRepository();

    const withdrawnOrderUseCase = new WithdrawnOrderUseCase(
      orderRepository,
      EventDispatcher.getInstance(),
    );

    return new WithdrawnOrderController(withdrawnOrderUseCase);
  }
}
