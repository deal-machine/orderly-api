import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductsService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSequelizeRepository } from './sequelize/product-sequelize.repository';
import { ProductModel } from './sequelize/product.model';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';
import { DecrementProductListener } from './listeners/decrement-product.listener';
import { CategoryModel } from './sequelize/category.model';
import { CategorySeeder } from './sequelize/seeders/category-seeder';

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
  ],
})
export class ProductModule {}
