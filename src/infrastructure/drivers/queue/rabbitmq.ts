import { Channel, Connection, Message, connect } from 'amqplib';

export class RabbitMQ {
  private conn: Connection;
  private channel: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async createQueue(queue: string): Promise<void> {
    await this.channel.assertQueue(queue, {
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
    return this.channel.consume(queue, async (message) => {
      await callback(message);
      this.channel.ack(message);
    });
  }
}
