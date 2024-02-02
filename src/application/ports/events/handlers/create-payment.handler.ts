import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';
import { IEventHandler } from 'src/application/ports/events';

export class PublishPaymentIntegrationHandler implements IEventHandler {
  // constructor(
  //   @InjectQueue('orders')
  //   private queue: Queue,
  // ) {}

  // @OnEvent('payment.created')
  async handle(event: CreatedPaymentEvent) {
    console.log('on event: ', event.name);
    // await this.queue.add('payment.created', event);
  }
}
