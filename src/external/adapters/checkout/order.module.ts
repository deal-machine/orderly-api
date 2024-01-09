import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from './order.controller';
import { OrdersService } from './order.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';
import { PublishOrderRequestListener } from './bullmq/listeners/publish-order-request.listener';
import { OrderConsumer } from './bullmq/consumers/order.consumer';
import { ChangeOrderStatusListener } from './bullmq/listeners/change-order-status.listener';
import { OrderSequelizeRepository } from './sequelize/order-sequelize.repository';
import { OrderItemModel } from './sequelize/order-item-model';
import { OrderModel } from './sequelize/order-model';
import { ProductsService } from '../product/product.service';
import { ProductSequelizeRepository } from '../product/sequelize/product-sequelize.repository';
import { ProductModel } from '../product/sequelize/product.model';
import { OrderConsumePayment } from './bullmq/consumers/payment.consumer';
import QueueModule from 'src/external/infra/queue';
import { CustomersService } from '../customer/customer.service';
import { CustomerSequelizeRepository } from '../customer/sequelize/customer-sequelize.repository';
import { CustomerModel } from '../customer/sequelize/customer.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      OrderModel,
      OrderItemModel,
      ProductModel,
      CustomerModel,
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
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'CustomerRepository', useExisting: CustomerSequelizeRepository },
    OrderSequelizeRepository,
    { provide: 'OrderRepository', useExisting: OrderSequelizeRepository },
    PublishOrderRequestListener,
    ChangeOrderStatusListener,
    OrderConsumer,
    OrderConsumePayment,
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
  ],
})
export class OrderModule {}
