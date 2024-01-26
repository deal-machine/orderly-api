import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from '../../infrastructure/modules/checkout/api/order.controller';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { PublishOrderRequestListener } from '../../infrastructure/modules/checkout/event-emitter/publish-order-request.listener';
import { ChangeOrderStatusListener } from '../../infrastructure/modules/checkout/event-emitter/change-order-status.listener';
import { OrderSequelizeRepository } from '../../infrastructure/modules/checkout/sequelize/order-sequelize.repository';
import { OrderItemModel } from '../../infrastructure/modules/checkout/sequelize/order-item-model';
import { OrderModel } from '../../infrastructure/modules/checkout/sequelize/order-model';
import { ProductSequelizeRepository } from '../../infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import { ProductModel } from '../../infrastructure/modules/checkin/products/sequelize/product.model';
import { OrderConsumePayment } from '../../infrastructure/modules/checkout/bullmq/payment.consumer';
import QueueModule from 'src/infrastructure/drivers/queue';
import { CustomerSequelizeRepository } from '../../infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { CustomerModel } from '../../infrastructure/modules/checkin/customers/sequelize/customer.model';
import { CategoryModel } from '../../infrastructure/modules/checkin/products/sequelize/category.model';
import { MomentDateAdapter } from 'src/infrastructure/drivers/date/moment';
import { FindCustomerByIdUseCase } from 'src/application/data/checkin/customers/usecases/find-customer-byid.usecase';
import { CheckProductQuantityUseCase } from 'src/application/data/checkin/products/usecases';
import {
  CreateOrderUseCase,
  FindOrdersUseCase,
  GetOrderReportByCustomerIdUseCase,
  GetOrderStatusUseCase,
  PayOrderUseCase,
  PrepareOrderUseCase,
  WithdrawnOrderUseCase,
} from 'src/application/data/checkout/usecases';

@Module({
  imports: [
    SequelizeModule.forFeature([
      OrderModel,
      OrderItemModel,
      ProductModel,
      CustomerModel,
      CategoryModel,
    ]),
    QueueModule,
  ],
  controllers: [OrderController],
  providers: [
    ProductSequelizeRepository,
    CustomerSequelizeRepository,
    OrderSequelizeRepository,
    PublishOrderRequestListener,
    ChangeOrderStatusListener,
    OrderConsumePayment,
    Uuid,
    MomentDateAdapter,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    { provide: 'OrderRepository', useExisting: OrderSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    { provide: 'IdGenerator', useExisting: Uuid },
    { provide: 'DateAdapter', useExisting: MomentDateAdapter },

    // use cases
    FindCustomerByIdUseCase,
    CheckProductQuantityUseCase,
    CreateOrderUseCase,
    PrepareOrderUseCase,
    WithdrawnOrderUseCase,
    FindOrdersUseCase,
    GetOrderStatusUseCase,
    GetOrderReportByCustomerIdUseCase,
    PayOrderUseCase,
    {
      provide: 'FindCustomerByIdUseCase',
      useExisting: FindCustomerByIdUseCase,
    },
    {
      provide: 'CheckProductQuantityUseCase',
      useExisting: CheckProductQuantityUseCase,
    },
    { provide: 'CreateOrderUseCase', useExisting: CreateOrderUseCase },
    { provide: 'PrepareOrderUseCase', useExisting: PrepareOrderUseCase },
    { provide: 'WithdrawnOrderUseCase', useExisting: WithdrawnOrderUseCase },
    { provide: 'FindOrdersUseCase', useExisting: FindOrdersUseCase },
    { provide: 'GetOrderStatusUseCase', useExisting: GetOrderStatusUseCase },
    {
      provide: 'GetOrderReportByCustomerIdUseCase',
      useExisting: GetOrderReportByCustomerIdUseCase,
    },
    { provide: 'PayOrderUseCase', useExisting: PayOrderUseCase },
  ],
})
export class OrderModule {}
