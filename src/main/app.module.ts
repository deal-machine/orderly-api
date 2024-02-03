import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CustomerRouter,
  OrderRouter,
  PaymentRouter,
  ProductRouter,
} from '../infrastructure/drivers/api/routes';
import DatabaseConnection from '../infrastructure/drivers/database';
import QueueConnection from '../infrastructure/drivers/queue';
import { adaptRoutes } from 'src/infrastructure/drivers/api/middlewares/adapt-routes.middleware';
import { CreatePaymentConsumer } from 'src/presentation/financial/consumers/create-payment.consumer';
import { MakeOrderWaitingPaymentConsumer } from 'src/presentation/checkout/consumers/make-order-waitingpayment.consumer';

@Module({
  imports: [
    QueueConnection,
    DatabaseConnection,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env'],
    }),
  ],
  controllers: [CustomerRouter, OrderRouter, PaymentRouter, ProductRouter],
  providers: [CreatePaymentConsumer, MakeOrderWaitingPaymentConsumer],
})
export class AppModule {
  configure(middleware: MiddlewareConsumer) {
    middleware
      .apply(adaptRoutes)
      .forRoutes(CustomerRouter, OrderRouter, ProductRouter, PaymentRouter);
  }
}

/** 
  webhook 
  https://webhook.site/#!/17bc7308-87bc-47e6-9074-a75344af88d1/4611a0ca-67d6-4749-9696-4bdd31b14bbd/1
*/

/**
 * queues + rabbitmq
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
