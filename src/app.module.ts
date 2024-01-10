import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import tokenGenerator from './external/infra/tokens';
import { Jwt } from './external/infra/tokens/jwt/jwt';
import { CustomerModule } from './external/adapters/customer/customer.module';
import { ProductModule } from './external/adapters/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './external/adapters/checkout/order.module';
import { PaymentModule } from './external/adapters/payment/payment.module';
import database from './external/infra/database';
import QueueModule from './external/infra/queue';
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
----------------API----------------
  - refatoração para clean architecture
----------------DOCUMENTAÇÃO----------------
  * solução
    - modulos, comunicações, infraestrutura(k8s), diagrama do banco
  * api (swagger + postman)
  * arquitetura (clean architecture)
    - pastas, classes, entidades...

  sugestão - (c4 model)
  video apresentando solução
  webhook 
  https://webhook.site/#!/17bc7308-87bc-47e6-9074-a75344af88d1/4611a0ca-67d6-4749-9696-4bdd31b14bbd/1
*/
