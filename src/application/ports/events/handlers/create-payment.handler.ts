import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';
import { IEventHandler } from 'src/application/ports/events';
import { IQueue } from '../../queues/queue';

export class CreatePaymentHandler implements IEventHandler {
  constructor(private queue: IQueue) {}
  async handle(event: CreatedPaymentEvent) {
    await this.queue.sendMessage(event);
  }
}
