import { IRepository } from 'src/domain/@shared/protocols/repository';
import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository extends IRepository<Customer> {
  findByCpf(cpf: string): Promise<Customer | null>;
  findOneByCpfOrEmail(cpf?: string, email?: string): Promise<Customer | null>;
}
