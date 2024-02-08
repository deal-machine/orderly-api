import { Channel, Connection, Message, connect } from 'amqplib';
import { env } from 'src/application/configs/env';
import { IMessageBroker } from 'src/application/ports/queues/publisher';

export class RabbitMQ implements IMessageBroker {
  private conn: Connection;
  private channel: Channel;

  async start(): Promise<void> {
    const connection = {
      hostname: env.amqpHost,
      password: env.amqpPass,
      port: env.amqpPort,
      username: env.amqpUserName,
      vhost: '/',
    };
    this.conn = await connect(connection);
    this.channel = await this.conn.createChannel();
  }

  async createQueue(queueName: string): Promise<void> {
    await this.channel.assertQueue(queueName, {
      durable: true,
    });
  }

  async createExchange(exchangeName: string): Promise<void> {
    await this.channel.assertExchange(exchangeName, 'topic', { durable: true });
  }

  async bindQueueInExchange({
    queue,
    exchange,
    bindigKey,
  }: {
    queue: string;
    exchange: string;
    bindigKey: string;
  }): Promise<void> {
    await this.channel.bindQueue(queue, exchange, bindigKey);
  }

  async publishInExchange({
    exchange,
    message,
    routingKey,
  }: {
    exchange: string;
    routingKey: string;
    message: string;
  }): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message));
  }

  async consume(queue: string, callback: (message: Message) => Promise<void>) {
    await this.channel.consume(queue, async (message) => {
      const data = JSON.parse(message.content.toString());
      callback(data)
        .then(() => {
          this.channel.ack(message);
        })
        .catch((err) => {
          console.error(err);
          this.channel.nack(message);
        });
    });
  }
}
