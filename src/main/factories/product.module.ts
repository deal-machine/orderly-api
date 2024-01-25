import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductController } from '../../infrastructure/modules/checkin/products/api/product.controller';
import { ProductSequelizeRepository } from '../../infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import { ProductModel } from '../../infrastructure/modules/checkin/products/sequelize/product.model';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { DecrementProductListener } from '../../infrastructure/modules/checkin/products/event-emitter/decrement-product.listener';
import { CategoryModel } from '../../infrastructure/modules/checkin/products/sequelize/category.model';
import { CategorySeeder } from '../../infrastructure/modules/checkin/products/sequelize/seeders/category-seeder';
import {
  CreateProductUseCase,
  CheckProductQuantityUseCase,
  DeleteProductUseCase,
  FindProductByCategoryIdUseCase,
  GetCategoriesUseCase,
  UpdateProductUseCase,
} from 'src/application/data/usecases/checkin/products';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel, CategoryModel])],
  controllers: [ProductController],
  providers: [
    ProductSequelizeRepository,
    CategorySeeder,
    DecrementProductListener,
    Uuid,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    { provide: 'IdGenerator', useExisting: Uuid },

    // use cases
    CreateProductUseCase,
    UpdateProductUseCase,
    CheckProductQuantityUseCase,
    DeleteProductUseCase,
    FindProductByCategoryIdUseCase,
    GetCategoriesUseCase,
    { provide: 'CreateProductUseCase', useExisting: CreateProductUseCase },
    { provide: 'UpdateProductUseCase', useExisting: UpdateProductUseCase },
    {
      provide: 'CheckProductQuantityUseCase',
      useExisting: CheckProductQuantityUseCase,
    },
    { provide: 'DeleteProductUseCase', useExisting: DeleteProductUseCase },
    {
      provide: 'FindProductByCategoryIdUseCase',
      useExisting: FindProductByCategoryIdUseCase,
    },
    { provide: 'GetCategoriesUseCase', useExisting: GetCategoriesUseCase },
  ],
})
export class ProductModule {}
