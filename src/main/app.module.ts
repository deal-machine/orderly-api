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
 *
 * serverless - alura
 * - api gateway - alura
 * - function - alura
 * - autenticação
 * - database - alura
 * - cloud(function, sql, identity)
 * ci/cd - full cycle
 * - github actions
 * - jenkins - youtube
 * - 4 repos
 * terraform - full cycle
 *
 */
