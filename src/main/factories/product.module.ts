import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductsService } from '../../infrastructure/modules/checkin/product/api/product.service';
import { ProductController } from '../../infrastructure/modules/checkin/product/api/product.controller';
import { ProductSequelizeRepository } from '../../infrastructure/modules/checkin/product/sequelize/product-sequelize.repository';
import { ProductModel } from '../../infrastructure/modules/checkin/product/sequelize/product.model';
import { Uuid } from 'src/infrastructure/adapters/tokens/uuid/uuid';
import { DecrementProductListener } from '../../infrastructure/modules/checkin/product/event-emitter/decrement-product.listener';
import { CategoryModel } from '../../infrastructure/modules/checkin/product/sequelize/category.model';
import { CategorySeeder } from '../../infrastructure/modules/checkin/product/sequelize/seeders/category-seeder';
import { CreateProductUseCase } from 'src/data/usecases/checkin/products/create-product.usecase';

@Module({
  imports: [SequelizeModule.forFeature([ProductModel, CategoryModel])],
  controllers: [ProductController],
  providers: [
    ProductsService,
    ProductSequelizeRepository,
    DecrementProductListener,
    { provide: 'ProductRepository', useExisting: ProductSequelizeRepository },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    CategorySeeder,
    CreateProductUseCase,
    { provide: 'CreateProductUseCase', useExisting: CreateProductUseCase },
  ],
})
export class ProductModule {}
