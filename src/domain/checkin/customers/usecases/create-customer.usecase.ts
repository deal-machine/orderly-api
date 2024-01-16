import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { ICustomer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';

export interface ICreateCustomerUseCase
  extends IUseCase<CreateCustomerDto, ICustomer> {
  execute(createCustomerDto: CreateCustomerDto): Promise<ICustomer>;
}
