import { ICreatePaymentUseCase } from 'src/domain/financial/usecases/create-payment.usecase';
export interface IConsumer {
  handle(message: any): Promise<void>;
}
export class CreatePaymentConsumer implements IConsumer {
  constructor(private readonly createPaymentUseCase: ICreatePaymentUseCase) {}

  async handle(message: any) {
    try {
      console.log('\n', { message }, '\n');
      const data = message.content.toString();

      await this.createPaymentUseCase.execute({
        customerId: data.customerId,
        orderId: data.id,
        total: data.total,
      });
    } catch (err: any) {
      console.error('\n PaymentConsumeOrder: ', err.message);
    }
  }
}
