import { ProductSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/product-sequelize.repository';
import { ChangePaymentStatusHandler } from 'src/application/ports/events/handlers/change-payment-status.handler';
import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { ChangeOrderStatusHandler } from 'src/application/ports/events/handlers/change-order-status.handler';
import { DecrementProductHandler } from 'src/application/ports/events/handlers/decrement-product.handler';
import { CreatePaymentHandler } from 'src/application/ports/events/handlers/create-payment.handler';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import { PaymentSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/payment-sequelize.repository';
import { MakeOrderWaitingPaymentHandler } from 'src/application/ports/events/handlers/make-order-waitingpay.handler';

export class EventProvider {
  static init() {
    console.time('Register events');

    const productRepository = new ProductSequelizeRepository();
    const orderRepository = new OrderSequelizeRepository();
    const paymentRepository = new PaymentSequelizeRepository();

    const decrementProductHandler = new DecrementProductHandler(
      productRepository,
    );
    const makeOrderWaitingPaymentHandler = new MakeOrderWaitingPaymentHandler();

    const changeOrderStatusHandler = new ChangeOrderStatusHandler(
      orderRepository,
    );
    const changePaymentStatusHandler = new ChangePaymentStatusHandler(
      paymentRepository,
    );
    const createPaymentHandler = new CreatePaymentHandler();

    const eventDispatcher = EventDispatcher.getInstance();

    eventDispatcher.register('ProductDecreasedEvent', decrementProductHandler);
    // verificar nome do evento - não está muito claro
    eventDispatcher.register(
      'CreatedOrderEvent',
      makeOrderWaitingPaymentHandler,
    );
    eventDispatcher.register(
      'ChangedOrderStatusEvent',
      changeOrderStatusHandler,
    );
    eventDispatcher.register(
      'ChangedPaymentStatusEvent',
      changePaymentStatusHandler,
    );
    eventDispatcher.register('CreatedPaymentEvent', createPaymentHandler);

    console.timeEnd('Register events');
  }
}
