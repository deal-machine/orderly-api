import { IMakeOrderWaitingForPaymentUseCase } from 'src/domain/checkout/usecases';
import { IConsumer } from 'src/presentation/@shared/protocols/consumer';

export class MakeOrderWaitingPaymentConsumer implements IConsumer {
  constructor(private readonly usecase: IMakeOrderWaitingForPaymentUseCase) {}

  async handle(data: any) {
    try {
      await this.usecase.execute(data.orderId);
    } catch (err: any) {
      console.error(`\n MakeOrderWaitingPaymentConsumer: ${err.message}`);
      throw err;
    }
  }
}
