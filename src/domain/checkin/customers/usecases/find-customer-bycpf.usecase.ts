import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { Customer } from '../entities/customer.entity';

export interface IFindCustomerByCpf extends IUseCase<string, Customer> {
  execute(cpf: string): Promise<Customer>;
}
