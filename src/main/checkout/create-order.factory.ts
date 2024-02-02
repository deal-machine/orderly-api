import { CreateOrderUseCase } from 'src/application/usecases/checkout';
import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import {
  CreateOrderController,
  ICreateOrderController,
} from 'src/presentation/checkout/controllers/create-order.controller';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';

export class CreateOrderFactory {
  static register(): ICreateOrderController {
    const orderRepository = new OrderSequelizeRepository();
    const idGenerator = new Uuid();

    const createOrderUseCase = new CreateOrderUseCase(
      orderRepository,
      EventDispatcher.getInstance(),
      idGenerator,
    );

    return new CreateOrderController(createOrderUseCase);
  }
}
