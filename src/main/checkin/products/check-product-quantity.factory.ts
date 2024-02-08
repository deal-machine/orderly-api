import { CheckProductQuantityUseCase } from 'src/application/usecases/checkin/products';
import { ProductSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/product-sequelize.repository';
import {
  CheckProductQuantityController,
  ICheckProductQuantityController,
} from 'src/presentation/checkin/products/controllers/check-product-quantity.controller';

export class CheckProductQuantityFactory {
  static register(): ICheckProductQuantityController {
    const productRepository = new ProductSequelizeRepository();

    const checkProductQuantityUseCase = new CheckProductQuantityUseCase(
      productRepository,
    );

    return new CheckProductQuantityController(checkProductQuantityUseCase);
  }
}
