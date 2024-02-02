import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CustomerModule,
  OrderModule,
  PaymentModule,
  ProductModule,
} from '../infrastructure/drivers/api';
import TokenGenerator from '../infrastructure/drivers/tokens';
import Database from '../infrastructure/drivers/database';
import QueueModule from '../infrastructure/drivers/queue';
import { adaptRoutes } from 'src/infrastructure/drivers/api/middlewares/adapt-routes.middleware';
import {
  CustomerRouter,
  OrderRouter,
  PaymentRouter,
  ProductRouter,
} from 'src/infrastructure/drivers/api/routes';

@Module({
  imports: [
    OrderModule,
    CustomerModule,
    ProductModule,
    PaymentModule,
    QueueModule,
    Database,
    TokenGenerator,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env'],
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(adaptRoutes)
      .forRoutes(CustomerRouter, OrderRouter, ProductRouter, PaymentRouter);
  }
}

/** 
  webhook 
  https://webhook.site/#!/17bc7308-87bc-47e6-9074-a75344af88d1/4611a0ca-67d6-4749-9696-4bdd31b14bbd/1

  postman 
  https://documenter.getpostman.com/view/13574011/2s9YsM8WDL
*/

/**
 * queues
 *
 * serverless - alura
 * api gateway - alura
 * ci/cd - full cycle
 * jenkins - youtube
 * terraform - full cycle
 *
 * autenticação
 * 4 repos
 * github actions
 * database
 * cloud(function, sql, identity)
 */
