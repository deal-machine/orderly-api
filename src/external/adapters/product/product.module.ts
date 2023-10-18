import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { ProductsService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSequelizeRepository } from './sequelize/product-sequelize.repository';
import { ProductModel } from './sequelize/product.model';

@Module({
  imports: [
    SequelizeModule.forFeature([ProductModel]),
    BullModule.registerQueue({
      name: 'products',
      defaultJobOptions: { attempts: 2 },
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductsService,
    ProductSequelizeRepository,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
  ],
})
export class ProductModule {}
