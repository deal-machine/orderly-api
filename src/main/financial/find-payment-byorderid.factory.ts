import { FindPaymentByOrderIdUseCase } from 'src/application/usecases/financial';
import { PaymentSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/payment-sequelize.repository';
import {
  FindPaymentByOrderIdController,
  IFindPaymentByOrderIdController,
} from 'src/presentation/financial/controllers/find-payment-byorderid.controller';

export class FindPaymentByOrderIdFactory {
  static register(): IFindPaymentByOrderIdController {
    const paymentRepository = new PaymentSequelizeRepository();

    const usecase = new FindPaymentByOrderIdUseCase(paymentRepository);

    return new FindPaymentByOrderIdController(usecase);
  }
}
