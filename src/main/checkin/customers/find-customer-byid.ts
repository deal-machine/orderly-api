import { FindCustomerByIdUseCase } from 'src/application/usecases/checkin/customers';
import { CustomerSequelizeRepository } from 'src/infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
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
