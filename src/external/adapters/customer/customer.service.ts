import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { Customer } from 'src/internal/domain/customers/entities/customer.entity';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';
import { NotFoundException } from 'src/internal/application/errors';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
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

  async findById(customerId: string) {
    const customer = await this.customerRepository.findOne(customerId);
    if (!customer) throw new NotFoundException('customer not found');
    return customer;
  }
}
