import { FindCustomerByCpfUseCase } from 'src/application/usecases/checkin/customers';
import { CustomerSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/customer-sequelize.repository';
import {
  FindCustomerByCpfController,
  IFindCustomerByCpfController,
} from 'src/presentation/checkin/customers/controllers/find-customer-bycpf.controller';

export class FindCustomerByCpfFactory {
  static register(): IFindCustomerByCpfController {
    const customerRepository = new CustomerSequelizeRepository();
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(
      customerRepository,
    );
    return new FindCustomerByCpfController(findCustomerByCpfUseCase);
  }
}
