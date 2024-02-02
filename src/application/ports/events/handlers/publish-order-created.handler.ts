// import { Queue } from 'bull';
import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { IEventHandler } from 'src/application/ports/events';

export class PublishOrderHandler implements IEventHandler {
  // constructor(private paymentQueue: Queue) {}

  // @OnEvent('order.created')
  async handle(event: CreatedOrderEvent) {
    console.log('\n\nevent: ', event.name, '\n\n');
    // await this.paymentQueue.add('payment.requested', event);
  }
}
