import { CreateProductUseCase } from 'src/application/usecases/checkin/products';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { ProductSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/product-sequelize.repository';
import {
  CreateProductController,
  ICreateProductController,
} from 'src/presentation/checkin/products/controllers/create-product.controller';

export class CreateProductFactory {
  static register(): ICreateProductController {
    const productRepository = new ProductSequelizeRepository();
    const idGenerator = new Uuid();
    const createProductUseCase = new CreateProductUseCase(
      productRepository,
      idGenerator,
    );
    return new CreateProductController(createProductUseCase);
  }
}
