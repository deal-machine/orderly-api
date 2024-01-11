import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { OrderItemModel } from 'src/infrastructure/modules/checkout/sequelize/order-item-model';
import { OrderModel } from 'src/infrastructure/modules/checkout/sequelize/order-model';
import { CustomerModel } from 'src/infrastructure/modules/checkin/customer/sequelize/customer.model';
import { ProductModel } from 'src/infrastructure/modules/checkin/product/sequelize/product.model';
import { CategoryModel } from 'src/infrastructure/modules/checkin/product/sequelize/category.model';
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
