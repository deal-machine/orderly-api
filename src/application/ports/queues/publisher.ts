import { IEvent } from '../events';

export interface IMessageBroker {
  start(): Promise<void>;
  createQueue(queueName: string): Promise<void>;
  createExchange(exchangeName: string): Promise<void>;
  bindQueueInExchange({
    queue,
    exchange,
    bindigKey,
  }: {
    queue: string;
    exchange: string;
    bindigKey: string;
  }): Promise<void>;
  publishInExchange({
    exchange,
    message,
    routingKey,
  }: {
    exchange: string;
    routingKey: string;
    message: string;
  }): Promise<boolean>;
  consume(
    queue: string,
    callback: (message: any) => Promise<void>,
  ): Promise<void>;
}

export interface IPublisher {
  sendMessage(message: IEvent): Promise<void>;
}

export class PaymentPublisher implements IPublisher {
  constructor(private messageBroker: IMessageBroker) {}

  async sendMessage(message: IEvent): Promise<void> {
    await this.messageBroker.publishInExchange({
      exchange: 'orderly',
      message: JSON.stringify(message.data),
      routingKey: 'payments.create',
    });
  }
}

export class OrderPublisher implements IPublisher {
  constructor(private messageBroker: IMessageBroker) {}

  async sendMessage(message: IEvent): Promise<void> {
    await this.messageBroker.publishInExchange({
      exchange: 'orderly',
      message: JSON.stringify(message.data),
      routingKey: 'orders.make-waiting-payment',
    });
  }
}
