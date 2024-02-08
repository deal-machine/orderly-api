import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { OrderItemModel } from 'src/infrastructure/drivers/database/models/order-item-model';
import { OrderModel } from 'src/infrastructure/drivers/database/models/order-model';
import { ProductModel } from 'src/infrastructure/drivers/database/models/product.model';
import { connection } from './connections';
import { CustomerModel } from './models/customer.model';
import { CategoryModel } from './models/category.model';
import { PaymentModel } from './models/payment-model';

export const sequelizeModels = [
  CustomerModel,
  ProductModel,
  OrderModel,
  OrderItemModel,
  CategoryModel,
  PaymentModel,
];

export const sequelizeModule = SequelizeModule.forRoot({
  ...connection,
  models: sequelizeModels,
} as SequelizeModuleOptions);
