import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { CreateCustomerDto } from 'src/domain/checkin/customers/dto/create-customer.dto';
import {
  Customer,
  ICustomer,
} from 'src/domain/checkin/customers/entities/customer.entity';
import { ICustomerRepository } from 'src/domain/checkin/customers/repositories/customer.repository';
import { ICreateCustomerUseCase } from 'src/domain/checkin/customers/usecases/create-customer.usecase';

export class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(
    private customerRepository: ICustomerRepository,
    private idGenerator: IIdentifierGenerator,
  ) {}

  async execute(createCustomerDto: CreateCustomerDto): Promise<ICustomer> {
    const customerExists = await this.customerRepository.findOneByCpfOrEmail(
      createCustomerDto.cpf,
      createCustomerDto.email,
    );

    if (!customerExists) {
      const customer = new Customer({
        id: this.idGenerator.generate(),
        cpf: createCustomerDto.cpf,
        email: createCustomerDto.email,
        name: createCustomerDto.name,
      });
      await this.customerRepository.create(customer);
      return customer;
    }

    const emailExists = customerExists.email
      ? { email: createCustomerDto.email }
      : null;
    const cpfExists = customerExists.cpf
      ? { cpf: createCustomerDto.cpf }
      : null;

    const customerUpdated = new Customer({
      id: customerExists.id,
      name: createCustomerDto.name,
      ...emailExists,
      ...cpfExists,
    });
    await this.customerRepository.update(customerExists.id, customerUpdated);

    return customerUpdated;
  }
}
