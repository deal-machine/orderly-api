import { CheckProductQuantityUseCase } from 'src/application/usecases/checkin/products';
import { EventDispatcher } from 'src/application/ports/events/dispatcher/event.dispatcher';
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
      EventDispatcher.getInstance(),
    );

    return new CheckProductQuantityController(checkProductQuantityUseCase);
  }
}
