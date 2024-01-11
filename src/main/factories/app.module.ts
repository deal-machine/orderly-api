import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import tokenGenerator from '../../infrastructure/adapters/tokens';
import { Jwt } from '../../infrastructure/adapters/tokens/jwt/jwt';
import { CustomerModule } from './customer.module';
import { ProductModule } from './product.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order.module';
import { PaymentModule } from './payment.module';
import database from '../../infrastructure/adapters/database';
import QueueModule from '../../infrastructure/adapters/queue';

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
export class AppModule {}

/** 
  webhook 
  https://webhook.site/#!/17bc7308-87bc-47e6-9074-a75344af88d1/4611a0ca-67d6-4749-9696-4bdd31b14bbd/1

  postman 
  https://documenter.getpostman.com/view/13574011/2s9YsM8WDL
*/
