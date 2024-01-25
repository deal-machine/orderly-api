import { CreateCustomerController } from 'src/application/data/controllers/checkin/customers/create-customer.controller';
import { CreateCustomerUseCase } from 'src/application/data/usecases/checkin/customers/create-customer.usecase';
import { IController } from 'src/domain/@shared/protocols/controller';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { CustomerSequelizeRepository } from 'src/infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { CustomerModel } from 'src/infrastructure/modules/checkin/customers/sequelize/customer.model';

export class CreateCustomerFactory {
  static register(): IController {
    const customerModel = new CustomerModel();
    const customerRepository = new CustomerSequelizeRepository(
      customerModel as any,
    );
    const idGenerator = new Uuid();
    const createCustomerUseCase = new CreateCustomerUseCase(
      customerRepository,
      idGenerator,
    );
    return new CreateCustomerController(createCustomerUseCase);
  }
}
