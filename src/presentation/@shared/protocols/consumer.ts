export interface IConsumer {
  handle(data: any): Promise<void>;
}
