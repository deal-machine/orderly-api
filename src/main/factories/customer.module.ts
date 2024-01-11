import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerSequelizeRepository } from '../../infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { HttpModule } from '@nestjs/axios';
import { CustomerHttp } from '../../infrastructure/modules/checkin/customers/http/customer-http.adapter';
import { CustomerModel } from '../../infrastructure/modules/checkin/customers/sequelize/customer.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { CustomerController } from '../../infrastructure/modules/checkin/customers/api/customer.controller';
import { CustomersService } from '../../infrastructure/modules/checkin/customers/api/customer.service';
import { CustomerConsumer } from '../../infrastructure/modules/checkin/customers/bullmq/customer.consumer';
import { PublishCustomerListener } from '../../infrastructure/modules/checkin/customers/event-emitter/publish-customer.listener';
import { Uuid } from 'src/infrastructure/adapters/tokens/uuid/uuid';

@Module({
  imports: [
    SequelizeModule.forFeature([CustomerModel]),
    HttpModule.register({
      baseURL: 'http://localhost:8000',
    }),
    BullModule.registerQueue({
      name: 'customers',
      defaultJobOptions: { attempts: 2 },
    }),
  ],
  controllers: [CustomerController],
  providers: [
    CustomersService,
    CustomerSequelizeRepository,
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    CustomerHttp,
    { provide: 'CustomerHttp', useExisting: CustomerHttp },
    CustomerConsumer,
    PublishCustomerListener,
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
  ],
})
export class CustomerModule {}
