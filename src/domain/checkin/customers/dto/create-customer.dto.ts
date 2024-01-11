import { ICustomer } from '../entities/customer.entity';

export interface CreateCustomerDto extends Partial<ICustomer> {}
