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
