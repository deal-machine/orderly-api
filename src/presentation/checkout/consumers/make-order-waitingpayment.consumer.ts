import { IMakeOrderWaitingForPaymentUseCase } from 'src/domain/checkout/usecases';

export interface IConsumer {
  handle(message: any): Promise<void>;
}
export class MakeOrderWaitingPaymentConsumer implements IConsumer {
  constructor(private readonly usecase: IMakeOrderWaitingForPaymentUseCase) {}

  async handle(message: any) {
    try {
      console.log('\n', { message }, '\n');
      const data = message.content.toString();

      await this.usecase.execute(data.orderId);
    } catch (err: any) {
      console.error(`\n PayOrderConsumer: ${err.message}`);
    }
  }
}
