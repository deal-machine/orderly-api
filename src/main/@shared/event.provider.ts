import { ChangePaymentStatusHandler } from 'src/application/ports/events/handlers/change-payment-status.handler';
import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { ChangeOrderStatusHandler } from 'src/application/ports/events/handlers/change-order-status.handler';
import { CreatePaymentHandler } from 'src/application/ports/events/handlers/create-payment.handler';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import { PaymentSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/payment-sequelize.repository';
import { MakeOrderWaitingPaymentHandler } from 'src/application/ports/events/handlers/make-order-waitingpay.handler';
import {
  IMessageBroker,
  OrderPublisher,
  PaymentPublisher,
} from 'src/application/ports/queues/publisher';

export class EventProvider {
  static init(messageBroker: IMessageBroker) {
    console.time('Register events');

    const orderRepository = new OrderSequelizeRepository();
    const paymentRepository = new PaymentSequelizeRepository();

    const orderPublisher = new OrderPublisher(messageBroker);
    const paymentPublisher = new PaymentPublisher(messageBroker);
    const makeOrderWaitingPaymentHandler = new MakeOrderWaitingPaymentHandler(
      orderPublisher,
    );

    const changeOrderStatusHandler = new ChangeOrderStatusHandler(
      orderRepository,
    );
    const changePaymentStatusHandler = new ChangePaymentStatusHandler(
      paymentRepository,
    );
    const createPaymentHandler = new CreatePaymentHandler(paymentPublisher);

    const eventDispatcher = EventDispatcher.getInstance();

    eventDispatcher.register('CreatedOrderEvent', createPaymentHandler);

    eventDispatcher.register(
      'ChangedOrderStatusEvent',
      changeOrderStatusHandler,
    );
    eventDispatcher.register(
      'ChangedPaymentStatusEvent',
      changePaymentStatusHandler,
    );
    eventDispatcher.register(
      'CreatedPaymentEvent',
      makeOrderWaitingPaymentHandler,
    );

    console.timeEnd('Register events');
  }
}
