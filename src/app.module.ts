import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import tokenGenerator from './external/infra/tokens';
import { Jwt } from './external/infra/tokens/jwt/jwt';
import { CustomerModule } from './external/adapters/customer/customer.module';
import { ProductModule } from './external/adapters/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './external/adapters/checkout/order.module';
import configuration from './internal/application/configs/configuration';
import { BullModule } from '@nestjs/bull';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { connection } from './external/infra/database/connections';
import { sequelizeModels } from './external/infra/database/sequelize';

@Module({
  imports: [
    OrderModule,
    CustomerModule,
    ProductModule,
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    SequelizeModule.forRoot({
      ...connection,
      models: sequelizeModels,
    } as SequelizeModuleOptions),
    tokenGenerator,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.production', '.env'],
    }),
  ],
  controllers: [],
  providers: [Jwt, { provide: 'TokenGenerator', useExisting: Jwt }],
})
export class AppModule {}
