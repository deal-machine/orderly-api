import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerSequelizeRepository } from '../../../infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { CustomerModel } from '../../../infrastructure/modules/checkin/customers/sequelize/customer.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CustomerRouter } from '../../../infrastructure/modules/checkin/customers/api/customer.router';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import {
  CreateCustomerUseCase,
  FindCustomerByIdUseCase,
} from 'src/application/usecases/checkin/customers';

@Module({
  imports: [SequelizeModule.forFeature([CustomerModel])],
  controllers: [CustomerRouter],
  providers: [
    CustomerSequelizeRepository,
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    CreateCustomerUseCase,
    { provide: 'CreateCustomerUseCase', useExisting: CreateCustomerUseCase },
    FindCustomerByIdUseCase,
    {
      provide: 'FindCustomerByIdUseCase',
      useExisting: FindCustomerByIdUseCase,
    },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
})
export class CustomerModule {}
