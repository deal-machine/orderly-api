import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerSequelizeRepository } from './sequelize/customer-sequelize.repository';
import { HttpModule } from '@nestjs/axios';
import { CustomerHttp } from './http/customer-http.adapter';
import { CustomerModel } from './sequelize/customer.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { CustomerController } from './customer.controller';
import { CustomersService } from './customer.service';
import { CustomerConsumer } from './bullmq/consumers/customer.consumer';
import { PublishCustomerListener } from './bullmq/listeners/publish-customer.listener';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';

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
