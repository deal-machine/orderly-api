import { IMakeOrderWaitingForPaymentUseCase } from 'src/domain/checkout/usecases';

export class MakeOrderWaitingPaymentConsumer {
  constructor(private readonly usecase: IMakeOrderWaitingForPaymentUseCase) {}

  // fila payment.created - quando pagamento já foi criado dispara essa fila para atualização da ordem de pedido
  async handle(job: { orderId: string }) {
    try {
      const { orderId } = job;

      await this.usecase.execute(orderId);
    } catch (err: any) {
      console.error(`\n PayOrderConsumer: ${err.message}`);
    }
  }
}
