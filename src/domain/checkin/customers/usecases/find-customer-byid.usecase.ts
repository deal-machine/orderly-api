import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { ICustomer } from '../entities/customer.entity';

export interface IFindCustomerByIdUseCase extends IUseCase<string, ICustomer> {
  execute(id: string): Promise<ICustomer>;
}
