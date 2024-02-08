import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { CreatePaymentUseCase } from 'src/application/usecases/financial';
import { PaymentSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/payment-sequelize.repository';
import { AxiosHttp } from 'src/infrastructure/drivers/http/axios';
import { PaymentMercadoPago } from 'src/infrastructure/drivers/integrations/payment/payment-mercadopago';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';

import {
  CreatePaymentConsumer,
  IConsumer,
} from 'src/presentation/financial/consumers/create-payment.consumer';

export class CreatePaymentConsumerFactory {
  static register(): IConsumer {
    // consume
    // fila create.payment - quando ordem de pedido foi criado  dispara essa fila para criação de pagamento
    const httpClient = new AxiosHttp();
    const idGenerator = new Uuid();
    const paymentIntegration = new PaymentMercadoPago(httpClient, idGenerator);
    const paymentRepository = new PaymentSequelizeRepository();
    const createPaymentUseCase = new CreatePaymentUseCase(
      paymentRepository,
      paymentIntegration,
      EventDispatcher.getInstance(),
      idGenerator,
    );
    return new CreatePaymentConsumer(createPaymentUseCase);
  }
}
