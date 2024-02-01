import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import tokenGenerator from '../infrastructure/drivers/tokens';
import { Jwt } from '../infrastructure/drivers/tokens/jwt/jwt';
import { CustomerModule } from './checkin/customers/customer.module';
import { ProductModule } from './checkin/products/product.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './checkout/order.module';
import { PaymentModule } from './financial/payment.module';
import database from '../infrastructure/drivers/database';
import QueueModule from '../infrastructure/drivers/queue';
import { CustomerRouter } from 'src/infrastructure/modules/checkin/customers/api/customer.router';
import { adaptRoutes } from 'src/infrastructure/drivers/api/middlewares/adapt-routes.middleware';
import { OrderRouter } from 'src/infrastructure/modules/checkout/api/order.router';
import { ProductRouter } from 'src/infrastructure/modules/checkin/products/api/product.router';

@Module({
  imports: [
    OrderModule,
    CustomerModule,
    ProductModule,
    PaymentModule,
    QueueModule,
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(adaptRoutes)
      .forRoutes(CustomerRouter, OrderRouter, ProductRouter);
  }
}

/** 
  webhook 
  https://webhook.site/#!/17bc7308-87bc-47e6-9074-a75344af88d1/4611a0ca-67d6-4749-9696-4bdd31b14bbd/1

  postman 
  https://documenter.getpostman.com/view/13574011/2s9YsM8WDL
*/
