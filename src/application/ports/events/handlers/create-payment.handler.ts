import { CreatedPaymentEvent } from 'src/domain/financial/events/payment-created.event';
import { IEventHandler } from 'src/application/ports/events';

// publica dados para criação do pagamento em conjunto com a integração de pagamento
export class CreatePaymentHandler implements IEventHandler {
  async handle(event: CreatedPaymentEvent) {
    console.log('on event: ', event.name);
    // chama fila create.payment
    // consumer CreatePaymentConsumer
  }
}
