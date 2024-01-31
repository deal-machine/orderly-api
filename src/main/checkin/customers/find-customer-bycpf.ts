import { FindCustomerByCpfUseCase } from 'src/application/usecases/checkin/customers';
import { CustomerSequelizeRepository } from 'src/infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { IController } from 'src/presentation/@shared/protocols/controller';
import { FindCustomerByCpfController } from 'src/presentation/checkin/customers/controllers/find-customer-bycpf.controller';

export class FindCustomerByCpfFactory {
  static register(): IController {
    const customerRepository = new CustomerSequelizeRepository();
    const findCustomerByCpfUseCase = new FindCustomerByCpfUseCase(
      customerRepository,
    );
    return new FindCustomerByCpfController(findCustomerByCpfUseCase);
  }
}
