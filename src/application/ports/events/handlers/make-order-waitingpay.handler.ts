import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { IEventHandler } from 'src/application/ports/events';
import { IQueue } from '../../queues/queue';

export class MakeOrderWaitingPaymentHandler implements IEventHandler {
  constructor(private queue: IQueue) {}

  async handle(event: CreatedOrderEvent) {
    await this.queue.sendMessage(event);
  }
}
