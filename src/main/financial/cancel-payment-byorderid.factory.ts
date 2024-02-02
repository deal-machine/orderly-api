import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { CancelPaymentByOrderIdUseCase } from 'src/application/usecases/financial';
import { PaymentSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/payment-sequelize.repository';
import {
  CancelPaymentByOrderIdController,
  ICancelPaymentByOrderIdController,
} from 'src/presentation/financial/controllers/cancel-payment-byorderid.controller';

export class CancelPaymentByOrderIdFactory {
  static register(): ICancelPaymentByOrderIdController {
    const paymentRepository = new PaymentSequelizeRepository();
    const usecase = new CancelPaymentByOrderIdUseCase(
      paymentRepository,
      EventDispatcher.getInstance(),
    );
    return new CancelPaymentByOrderIdController(usecase);
  }
}
