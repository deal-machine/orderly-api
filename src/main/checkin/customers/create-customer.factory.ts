import { CreateCustomerUseCase } from 'src/application/usecases/checkin/customers/create-customer.usecase';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { CustomerSequelizeRepository } from 'src/infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { IController } from 'src/presentation/@shared/protocols/controller';
import { CreateCustomerController } from 'src/presentation/checkin/customers/controllers/create-customer.controller';

export class CreateCustomerFactory {
  static register(): IController {
    const customerRepository = new CustomerSequelizeRepository();
    const idGenerator = new Uuid();
    const createCustomerUseCase = new CreateCustomerUseCase(
      customerRepository,
      idGenerator,
    );
    return new CreateCustomerController(createCustomerUseCase);
  }
}
