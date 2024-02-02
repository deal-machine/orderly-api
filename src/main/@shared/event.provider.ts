import { ProductSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/product-sequelize.repository';
import { ChangePaymentStatusHandler } from 'src/application/ports/events/handlers/change-payment-status.handler';
import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { ChangeOrderStatusHandler } from 'src/application/ports/events/handlers/change-order-status.handler';
import { DecrementProductHandler } from 'src/application/ports/events/handlers/decrement-product.handler';
import { PublishOrderHandler } from 'src/application/ports/events/handlers/publish-order-created.handler';
import { PublishPaymentIntegrationHandler } from 'src/application/ports/events/handlers/create-payment.handler';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import { PaymentSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/payment-sequelize.repository';

export class EventProvider {
  static init() {
    console.time('Register events');

    const productRepository = new ProductSequelizeRepository();
    const orderRepository = new OrderSequelizeRepository();
    const paymentRepository = new PaymentSequelizeRepository();

    const decrementProductHandler = new DecrementProductHandler(
      productRepository,
    );
    const publishOrderHandler = new PublishOrderHandler();

    const changeOrderStatusHandler = new ChangeOrderStatusHandler(
      orderRepository,
    );
    const changePaymentStatusHandler = new ChangePaymentStatusHandler(
      paymentRepository,
    );
    const publishPaymentIntegrationHandler =
      new PublishPaymentIntegrationHandler();

    const eventDispatcher = EventDispatcher.getInstance();

    eventDispatcher.register('ProductDecreasedEvent', decrementProductHandler);
    eventDispatcher.register('CreatedOrderEvent', publishOrderHandler);
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
      publishPaymentIntegrationHandler,
    );

    console.timeEnd('Register events');
  }
}
