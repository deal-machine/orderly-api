import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from '../../infrastructure/modules/checkout/api/order.controller';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Uuid } from 'src/infrastructure/adapters/tokens/uuid/uuid';
import { PublishOrderRequestListener } from '../../infrastructure/modules/checkout/event-emitter/publish-order-request.listener';
import { ChangeOrderStatusListener } from '../../infrastructure/modules/checkout/event-emitter/change-order-status.listener';
import { OrderSequelizeRepository } from '../../infrastructure/modules/checkout/sequelize/order-sequelize.repository';
import { OrderItemModel } from '../../infrastructure/modules/checkout/sequelize/order-item-model';
import { OrderModel } from '../../infrastructure/modules/checkout/sequelize/order-model';
import { ProductSequelizeRepository } from '../../infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import { ProductModel } from '../../infrastructure/modules/checkin/products/sequelize/product.model';
import { OrderConsumePayment } from '../../infrastructure/modules/checkout/bullmq/payment.consumer';
import QueueModule from 'src/infrastructure/adapters/queue';
import { CustomerSequelizeRepository } from '../../infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { CustomerModel } from '../../infrastructure/modules/checkin/customers/sequelize/customer.model';
import { CategoryModel } from '../../infrastructure/modules/checkin/products/sequelize/category.model';
import { MomentDateAdapter } from 'src/infrastructure/adapters/date/moment';
import { FindCustomerByIdUseCase } from 'src/application/usecases/checkin/customers/find-customer-byid.usecase';
import { CheckProductQuantityUseCase } from 'src/application/usecases/checkin/products/check-product-quantity.usecase';
import { CreateOrderUseCase } from 'src/application/usecases/checkout/create-order.usecase';
import { PrepareOrderUseCase } from 'src/application/usecases/checkout/prepare-order.usecase';
import { WithdrawnOrderUseCase } from 'src/application/usecases/checkout/withdrawn-order.usecase';
import { FindOrdersUseCase } from 'src/application/usecases/checkout/find-orders.usecase';
import { GetOrderStatusUseCase } from 'src/application/usecases/checkout/get-orderstatus.usecase';
import { GetOrderReportByCustomerIdUseCase } from 'src/application/usecases/checkout/get-orderreport-bycustomerid.usecase';
import { PayOrderUseCase } from 'src/application/usecases/checkout/pay-order.usecase';

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
    FindCustomerByIdUseCase,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    { provide: 'OrderRepository', useExisting: OrderSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    { provide: 'IdGenerator', useExisting: Uuid },
    { provide: 'DateAdapter', useExisting: MomentDateAdapter },
    {
      provide: 'FindCustomerByIdUseCase',
      useExisting: FindCustomerByIdUseCase,
    },
    CheckProductQuantityUseCase,
    {
      provide: 'CheckProductQuantityUseCase',
      useExisting: CheckProductQuantityUseCase,
    },
    CreateOrderUseCase,
    { provide: 'CreateOrderUseCase', useExisting: CreateOrderUseCase },
    PrepareOrderUseCase,
    { provide: 'PrepareOrderUseCase', useExisting: PrepareOrderUseCase },
    WithdrawnOrderUseCase,
    { provide: 'WithdrawnOrderUseCase', useExisting: WithdrawnOrderUseCase },
    FindOrdersUseCase,
    { provide: 'FindOrdersUseCase', useExisting: FindOrdersUseCase },
    GetOrderStatusUseCase,
    { provide: 'GetOrderStatusUseCase', useExisting: GetOrderStatusUseCase },
    GetOrderReportByCustomerIdUseCase,
    {
      provide: 'GetOrderReportByCustomerIdUseCase',
      useExisting: GetOrderReportByCustomerIdUseCase,
    },
    PayOrderUseCase,
    { provide: 'PayOrderUseCase', useExisting: PayOrderUseCase },
  ],
})
export class OrderModule {}
