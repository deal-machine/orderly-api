import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { OrderItemModel } from 'src/infrastructure/drivers/database/models/order-item-model';
import { OrderModel } from 'src/infrastructure/drivers/database/models/order-model';
import { CustomerModel } from 'src/infrastructure/modules/checkin/customers/sequelize/customer.model';
import { ProductModel } from 'src/infrastructure/drivers/database/models/product.model';
import { CategoryModel } from 'src/infrastructure/modules/checkin/products/sequelize/category.model';
import { connection } from './connections';

export const sequelizeModels = [
  CustomerModel,
  ProductModel,
  OrderModel,
  OrderItemModel,
  CategoryModel,
];

export const sequelizeModule = SequelizeModule.forRoot({
  ...connection,
  models: sequelizeModels,
} as SequelizeModuleOptions);
