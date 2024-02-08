import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { MakeOrderWaitingForPaymentUseCase } from 'src/application/usecases/checkout';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import {
  IConsumer,
  MakeOrderWaitingPaymentConsumer,
} from 'src/presentation/checkout/consumers/make-order-waitingpayment.consumer';

export class MakeOrderWaitingPaymentConsumerFactory {
  static register(): IConsumer {
    // consume

    // fila payment.created - quando pagamento já foi criado dispara essa fila para atualização da ordem de pedido = MakeOrderWaitingPaymentConsumer
    const orderRepository = new OrderSequelizeRepository();
    const makeOrderWaitingForPaymentUseCase =
      new MakeOrderWaitingForPaymentUseCase(
        orderRepository,
        EventDispatcher.getInstance(),
      );
    return new MakeOrderWaitingPaymentConsumer(
      makeOrderWaitingForPaymentUseCase,
    );
  }
}
