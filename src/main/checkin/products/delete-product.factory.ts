import { DeleteProductUseCase } from 'src/application/usecases/checkin/products';
import { ProductSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/product-sequelize.repository';
import {
  DeleteProductController,
  IDeleteProductController,
} from 'src/presentation/checkin/products/controllers/delete-product.controller';

export class DeleteProductFactory {
  static register(): IDeleteProductController {
    const productRepository = new ProductSequelizeRepository();

    const deleteProductUseCase = new DeleteProductUseCase(productRepository);
    return new DeleteProductController(deleteProductUseCase);
  }
}
