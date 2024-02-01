import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { ICustomer } from '../entities/customer.entity';

export interface IFindCustomerByCpfUseCase extends IUseCase<string, ICustomer> {
  execute(cpf: string): Promise<ICustomer>;
}
