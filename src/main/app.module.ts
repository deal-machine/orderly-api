import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  CustomerRouter,
  OrderRouter,
  PaymentRouter,
  ProductRouter,
} from '../infrastructure/drivers/api/routes';
import DatabaseConnection from '../infrastructure/drivers/database';
import { adaptRoutes } from 'src/infrastructure/drivers/api/middlewares/adapt-routes.middleware';

@Module({
  imports: [
    DatabaseConnection,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env'],
    }),
  ],
  controllers: [CustomerRouter, OrderRouter, PaymentRouter, ProductRouter],
})
export class AppModule {
  configure(m: MiddlewareConsumer) {
    m.apply(adaptRoutes).forRoutes(
      CustomerRouter,
      OrderRouter,
      ProductRouter,
      PaymentRouter,
    );
  }
}

/**
 * rodar k8s
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
