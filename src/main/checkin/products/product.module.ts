import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductRouter } from '../../../infrastructure/modules/checkin/products/api/product.router';
import { ProductSequelizeRepository } from '../../../infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import { ProductModel } from '../../../infrastructure/modules/checkin/products/sequelize/product.model';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { DecrementProductListener } from '../../../infrastructure/modules/checkin/products/event-emitter/decrement-product.listener';
import { CategoryModel } from '../../../infrastructure/modules/checkin/products/sequelize/category.model';
import { CategorySeeder } from '../../../infrastructure/modules/checkin/products/sequelize/seeders/category-seeder';
import { CheckProductQuantityUseCase } from 'src/application/usecases/checkin/products';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel, CategoryModel])],
  controllers: [ProductRouter],
  providers: [
    ProductSequelizeRepository,
    CategorySeeder,
    DecrementProductListener,
    Uuid,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    { provide: 'IdGenerator', useExisting: Uuid },

    // use cases
    CheckProductQuantityUseCase,
    {
      provide: 'CheckProductQuantityUseCase',
      useExisting: CheckProductQuantityUseCase,
    },
  ],
})
export class ProductModule {}
