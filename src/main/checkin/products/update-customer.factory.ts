import { UpdateProductUseCase } from 'src/application/usecases/checkin/products';
import { ProductSequelizeRepository } from 'src/infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import {
  IUpdateProductController,
  UpdateProductController,
} from 'src/presentation/checkin/products/controllers/update-product.controller';

export class UpdateProductFactory {
  static register(): IUpdateProductController {
    const productRepository = new ProductSequelizeRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    return new UpdateProductController(updateProductUseCase);
  }
}
