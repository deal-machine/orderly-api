import { IConsumer } from 'src/presentation/@shared/protocols/consumer';
import { ICreatePaymentUseCase } from 'src/domain/financial/usecases/create-payment.usecase';

export class CreatePaymentConsumer implements IConsumer {
  constructor(private readonly createPaymentUseCase: ICreatePaymentUseCase) {}

  async handle(data: any) {
    try {
      await this.createPaymentUseCase.execute({
        customerId: data.customerId,
        orderId: data.id,
        total: data.total,
      });
    } catch (err: any) {
      console.error('\n CreatePaymentConsumer: ', err.message);
      throw err;
    }
  }
}
