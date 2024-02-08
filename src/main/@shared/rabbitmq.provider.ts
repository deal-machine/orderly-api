import { RabbitMQ } from 'src/infrastructure/drivers/queue/rabbitmq';
import { MakeOrderWaitingPaymentConsumerFactory } from '../checkout/make-order-waitingpayment.consumer';
import { CreatePaymentConsumerFactory } from '../financial/create-payment.consumer';
import { IQueueAdapter } from 'src/application/ports/queues/queue';
import { env } from 'src/application/configs/env';

export class QueueProvider {
  static async init(): Promise<IQueueAdapter> {
    console.time('Start broker');

    const url = `amqp://${env.amqpUserName}:${env.amqpPass}@${env.amqpHost}:${env.amqpPort}`;
    console.log('\n', { url }, '\n');
    const server = new RabbitMQ(url);
    await server.start();

    const exchangeName = 'orderly';
    await server.createExchange(exchangeName);

    const paymentsQueueName = 'payments';
    const ordersQueueName = 'orders';
    await server.createQueue(paymentsQueueName);
    await server.createQueue(ordersQueueName);

    const paymentBindingKey = 'payments.*';
    await server.bindQueueInExchange({
      queue: paymentsQueueName,
      exchange: exchangeName,
      bindigKey: paymentBindingKey,
    });

    const ordersBindingKey = 'orders.*';
    await server.bindQueueInExchange({
      queue: ordersQueueName,
      exchange: exchangeName,
      bindigKey: ordersBindingKey,
    });

    const makeOrderWaitingPaymentConsumer =
      MakeOrderWaitingPaymentConsumerFactory.register();
    await server.consume(paymentsQueueName, (message) =>
      makeOrderWaitingPaymentConsumer.handle(message),
    );

    const createPaymentConsumer = CreatePaymentConsumerFactory.register();
    await server.consume(ordersQueueName, (message) =>
      createPaymentConsumer.handle(message),
    );

    console.timeEnd('Start broker');
    return server;
  }
}
