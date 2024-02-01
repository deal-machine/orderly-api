import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerModel } from '../../../infrastructure/modules/checkin/customers/sequelize/customer.model';
import { CustomerRouter } from '../../../infrastructure/modules/checkin/customers/api/customer.router';

@Module({
  imports: [SequelizeModule.forFeature([CustomerModel])],
  controllers: [CustomerRouter],
})
export class CustomerModule {}
