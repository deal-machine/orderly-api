import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import tokenGenerator from './external/infra/tokens';
import { Jwt } from './external/infra/tokens/jwt/jwt';
import { CustomerModule } from './external/adapters/customer/customer.module';
import { ProductModule } from './external/adapters/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './external/adapters/checkout/order.module';
import database from './external/infra/database';
import queue from './external/infra/queue';
@Module({
  imports: [
    OrderModule,
    CustomerModule,
    ProductModule,
    queue,
    database,
    tokenGenerator,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env'],
    }),
  ],
  controllers: [],
  providers: [Jwt, { provide: 'TokenGenerator', useExisting: Jwt }],
})
export class AppModule {
  // constructor(@InjectQueue('orders') private ordersQueue: Queue) {}
  // configure(consumer: MiddlewareBuilder) {
  //   const { router } = createBullBoard([new BullAdapter(this.ordersQueue)]);
  //   consumer.apply(router).forRoutes('/admin/queues');
  // }
}
