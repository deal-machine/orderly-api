import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';
import { IEventHandler } from 'src/application/ports/events';
import { IPublisher } from '../../queues/publisher';

export class CreatePaymentHandler implements IEventHandler {
  constructor(private publisher: IPublisher) {}
  async handle(event: CreatedPaymentEvent) {
    await this.publisher.sendMessage(event);
  }
}
