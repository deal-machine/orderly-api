import { NotFoundException } from 'src/application/errors';
import { Customer } from 'src/domain/checkin/customers/entities/customer.entity';
import { ICustomerRepository } from 'src/domain/checkin/customers/repositories/customer.repository';
import { IFindCustomerByCpfUseCase } from 'src/domain/checkin/customers/usecases/find-customer-bycpf.usecase';

export class FindCustomerByCpfUseCase implements IFindCustomerByCpfUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(cpf: string): Promise<Customer> {
    const customer = await this.customerRepository.findByCpf(cpf);

    if (!customer) throw new NotFoundException('Customer not found');

    return customer;
  }
}
