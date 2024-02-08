import { env } from 'src/application/configs/env';
import { RabbitMQ } from 'src/infrastructure/drivers/queue/rabbitmq';
import { MakeOrderWaitingPaymentConsumerFactory } from '../checkout/make-order-waitingpayment.consumer';
import { CreatePaymentConsumerFactory } from '../financial/create-payment.consumer';

export class QueueProvider {
  static async init() {
    console.time('Start broker');
    const uri = `amqp://${env.amqpUserName}:${env.amqpPass}@rabbitmq:${env.amqpPort}`;
    const server = new RabbitMQ(uri);
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
    await server.consume(
      paymentsQueueName,
      makeOrderWaitingPaymentConsumer.handle,
    );

    const createPaymentConsumer = CreatePaymentConsumerFactory.register();
    await server.consume(ordersQueueName, createPaymentConsumer.handle);

    console.timeEnd('Start broker');
  }
}
