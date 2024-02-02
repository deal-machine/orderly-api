import { CustomerModel } from '../models/customer.model';
import { Op } from 'sequelize';
import { ICustomerRepository } from 'src/domain/checkin/customers/repositories/customer.repository';
import { Customer } from 'src/domain/checkin/customers/entities/customer.entity';

export class CustomerSequelizeRepository implements ICustomerRepository {
  async findOne(id: string): Promise<Customer | null> {
    const customerModel = await CustomerModel.findOne({ where: { id } });
    if (!customerModel) return null;

    return new Customer({
      id: customerModel.id,
      cpf: customerModel.cpf,
      email: customerModel.email,
      name: customerModel.name,
    });
  }

  async findOneByCpfOrEmail(
    cpf = null,
    email = null,
  ): Promise<Customer | null> {
    const customerModel = await CustomerModel.findOne({
      where: { [Op.or]: [{ cpf }, { email }] },
    });
    if (!customerModel) return null;

    return new Customer({
      id: customerModel.id,
      cpf: customerModel.cpf,
      email: customerModel.email,
      name: customerModel.name,
    });
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    const customerModel = await CustomerModel.findOne({ where: { cpf } });
    if (!customerModel) return null;
    return new Customer({
      id: customerModel.id,
      cpf: customerModel.cpf,
      email: customerModel.email,
      name: customerModel.name,
    });
  }

  async findAll(): Promise<Customer[]> {
    const customersModel = await CustomerModel.findAll();
    if (customersModel.length < 1) throw Error('not found customers in db');
    return customersModel.map(
      (c) =>
        new Customer({
          cpf: c.cpf,
          email: c.email,
          id: c.id,
          name: c.name,
        }),
    );
  }

  async create(params: Partial<Customer>): Promise<Customer> {
    const customerModel = await CustomerModel.create(params);
    return new Customer({
      cpf: customerModel.cpf,
      email: customerModel.email,
      id: customerModel.id,
      name: customerModel.name,
    });
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({ where: { id } });
  }

  async update(
    id: string,
    customerToUpdate: Omit<Customer, 'id'>,
  ): Promise<void> {
    await CustomerModel.update(customerToUpdate, { where: { id } });
  }
}
