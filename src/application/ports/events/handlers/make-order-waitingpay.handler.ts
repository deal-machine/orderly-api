import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { IEventHandler } from 'src/application/ports/events';
import { IPublisher } from '../../queues/publisher';

export class MakeOrderWaitingPaymentHandler implements IEventHandler {
  constructor(private publisher: IPublisher) {}

  async handle(event: CreatedOrderEvent) {
    await this.publisher.sendMessage(event);
  }
}
