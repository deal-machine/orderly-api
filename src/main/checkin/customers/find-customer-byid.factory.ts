import { FindCustomerByIdUseCase } from 'src/application/usecases/checkin/customers';
import { CustomerSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/customer-sequelize.repository';
import {
  FindCustomerByIdController,
  IFindCustomerByIdController,
} from 'src/presentation/checkin/customers/controllers/find-customer-byid.controller';

export class FindCustomerByIdFactory {
  static register(): IFindCustomerByIdController {
    const customerRepository = new CustomerSequelizeRepository();
    const createCustomerUseCase = new FindCustomerByIdUseCase(
      customerRepository,
    );
    return new FindCustomerByIdController(createCustomerUseCase);
  }
}
