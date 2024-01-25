import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/application/errors';
import { Customer } from 'src/domain/checkin/customers/entities/customer.entity';
import { ICustomerRepository } from 'src/domain/checkin/customers/repositories/customer.repository';
import { IFindCustomerByCpf } from 'src/domain/checkin/customers/usecases/find-customer-bycpf.usecase';

@Injectable()
export class FindCustomerByCpf implements IFindCustomerByCpf {
  constructor(
    @Inject('CustomerRepository')
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(cpf: string): Promise<Customer> {
    const customer = await this.customerRepository.findByCpf(cpf);

    if (!customer) throw new NotFoundException('Customer not found');

    return customer;
  }
}
