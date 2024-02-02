import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
import { ApprovePaymentByOrderIdUseCase } from 'src/application/usecases/financial';
import { PaymentSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/payment-sequelize.repository';
import {
  ApprovePaymentByOrderIdController,
  IApprovePaymentByOrderIdController,
} from 'src/presentation/financial/controllers/approve-payment-byorderid.controller';

export class ApprovePaymentByOrderIdFactory {
  static register(): IApprovePaymentByOrderIdController {
    const paymentRepository = new PaymentSequelizeRepository();
    const usecase = new ApprovePaymentByOrderIdUseCase(
      paymentRepository,
      EventDispatcher.getInstance(),
    );
    return new ApprovePaymentByOrderIdController(usecase);
  }
}
