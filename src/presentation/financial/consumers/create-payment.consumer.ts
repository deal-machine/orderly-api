import { ICreatePaymentUseCase } from 'src/domain/financial/usecases/create-payment.usecase';

export class CreatePaymentConsumer {
  constructor(private readonly createPaymentUseCase: ICreatePaymentUseCase) {}

  // fila create.payment - quando ordem de pedido foi criado  dispara essa fila para criação de pagamento
  async handle(job: { customerId: string; id: string; total: number }) {
    try {
      const { id, customerId, total } = job;

      await this.createPaymentUseCase.execute({
        customerId,
        orderId: id,
        total,
      });
    } catch (err: any) {
      console.error('\n PaymentConsumeOrder: ', err.message);
    }
  }
}
