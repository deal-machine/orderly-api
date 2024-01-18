import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductController } from '../../infrastructure/modules/checkin/products/api/product.controller';
import { ProductSequelizeRepository } from '../../infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import { ProductModel } from '../../infrastructure/modules/checkin/products/sequelize/product.model';
import { Uuid } from 'src/infrastructure/adapters/tokens/uuid/uuid';
import { DecrementProductListener } from '../../infrastructure/modules/checkin/products/event-emitter/decrement-product.listener';
import { CategoryModel } from '../../infrastructure/modules/checkin/products/sequelize/category.model';
import { CategorySeeder } from '../../infrastructure/modules/checkin/products/sequelize/seeders/category-seeder';
import { CreateProductUseCase } from 'src/application/usecases/checkin/products/create-product.usecase';
import { UpdateProductUseCase } from 'src/application/usecases/checkin/products/update-product.usecase';
import { CheckProductQuantityUseCase } from 'src/application/usecases/checkin/products/check-product-quantity.usecase';
import { DeleteProductUseCase } from 'src/application/usecases/checkin/products/delete-product.usecase';
import { FindProductByCategoryIdUseCase } from 'src/application/usecases/checkin/products/find-product-bycategoryid.usecase';
import { GetCategoriesUseCase } from 'src/application/usecases/checkin/products/get-categories.usecase';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel, CategoryModel])],
  controllers: [ProductController],
  providers: [
    ProductSequelizeRepository,
    DecrementProductListener,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    CategorySeeder,
    CreateProductUseCase,
    { provide: 'CreateProductUseCase', useExisting: CreateProductUseCase },
    UpdateProductUseCase,
    { provide: 'UpdateProductUseCase', useExisting: UpdateProductUseCase },
    CheckProductQuantityUseCase,
    {
      provide: 'CheckProductQuantityUseCase',
      useExisting: CheckProductQuantityUseCase,
    },
    DeleteProductUseCase,
    { provide: 'DeleteProductUseCase', useExisting: DeleteProductUseCase },
    FindProductByCategoryIdUseCase,
    {
      provide: 'FindProductByCategoryIdUseCase',
      useExisting: FindProductByCategoryIdUseCase,
    },
    GetCategoriesUseCase,
    { provide: 'GetCategoriesUseCase', useExisting: GetCategoriesUseCase },
  ],
})
export class ProductModule {}
