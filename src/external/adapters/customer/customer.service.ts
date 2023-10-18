import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from 'src/internal/domain/customers/repositories/customer.repository';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';
import { Customer } from 'src/internal/domain/customers/entities/customer.entity';
import { IIdentifierGenerator } from 'src/internal/application/ports/tokens/id-generator';

@Injectable()
export class CustomersService {
  constructor(
    @Inject('CustomerRepository')
    private customerRepository: ICustomerRepository,

    @Inject('IdentifierGenerator')
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

    await this.customerRepository.update(customerExists.id, {
      name: createCustomerDto.name,
      cpf: createCustomerDto.cpf,
      email: createCustomerDto.email,
    });

    return customerExists;
  }

  async findById(id: string) {
    return this.customerRepository.findOne(id);
  }
}
