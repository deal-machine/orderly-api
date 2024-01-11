import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from '../../infrastructure/modules/checkout/api/order.controller';
import { OrdersService } from '../../infrastructure/modules/checkout/api/order.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Uuid } from 'src/infrastructure/adapters/tokens/uuid/uuid';
import { PublishOrderRequestListener } from '../../infrastructure/modules/checkout/event-emitter/publish-order-request.listener';
import { OrderConsumer } from '../../infrastructure/modules/checkout/bullmq/order.consumer';
import { ChangeOrderStatusListener } from '../../infrastructure/modules/checkout/event-emitter/change-order-status.listener';
import { OrderSequelizeRepository } from '../../infrastructure/modules/checkout/sequelize/order-sequelize.repository';
import { OrderItemModel } from '../../infrastructure/modules/checkout/sequelize/order-item-model';
import { OrderModel } from '../../infrastructure/modules/checkout/sequelize/order-model';
import { ProductsService } from '../../infrastructure/modules/checkin/products/api/product.service';
import { ProductSequelizeRepository } from '../../infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import { ProductModel } from '../../infrastructure/modules/checkin/products/sequelize/product.model';
import { OrderConsumePayment } from '../../infrastructure/modules/checkout/bullmq/payment.consumer';
import QueueModule from 'src/infrastructure/adapters/queue';
import { CustomersService } from '../../infrastructure/modules/checkin/customers/api/customer.service';
import { CustomerSequelizeRepository } from '../../infrastructure/modules/checkin/customers/sequelize/customer-sequelize.repository';
import { CustomerModel } from '../../infrastructure/modules/checkin/customers/sequelize/customer.model';
import { CategoryModel } from '../../infrastructure/modules/checkin/products/sequelize/category.model';
import { MomentDateAdapter } from 'src/infrastructure/adapters/date/moment';

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
    OrdersService,
    ProductsService,
    CustomersService,
    ProductSequelizeRepository,
    CustomerSequelizeRepository,
    OrderSequelizeRepository,
    PublishOrderRequestListener,
    ChangeOrderStatusListener,
    OrderConsumer,
    OrderConsumePayment,
    Uuid,
    MomentDateAdapter,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    { provide: 'OrderRepository', useExisting: OrderSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    { provide: 'IdGenerator', useExisting: Uuid },
    { provide: 'DateAdapter', useExisting: MomentDateAdapter },
  ],
})
export class OrderModule {}
