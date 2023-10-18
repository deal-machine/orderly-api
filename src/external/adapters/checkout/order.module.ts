import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BullModule } from '@nestjs/bull';
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

@Module({
  imports: [
    SequelizeModule.forFeature([OrderModel, OrderItemModel]),
    BullModule.registerQueue({
      name: 'orders',
      defaultJobOptions: { attempts: 2 },
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrdersService,
    OrderSequelizeRepository,
    { provide: 'OrderRepository', useExisting: OrderSequelizeRepository },
    PublishOrderRequestListener,
    ChangeOrderStatusListener,
    OrderConsumer,
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdentifierGenerator', useExisting: Uuid },
  ],
})
export class OrderModule {}
