import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { IEventHandler } from 'src/application/ports/events';

// publica na fila em que atualiza a ordem de pedido para pendende de pagamento (MakeOrderWaitingForPaymentUseCase)
export class MakeOrderWaitingPaymentHandler implements IEventHandler {
  async handle(event: CreatedOrderEvent) {
    console.log('\n\nevent: ', event.name, '\n\n');
    // chama fila payment.created
    // consumer MakeOrderWaitingPaymentConsumer
  }
}
