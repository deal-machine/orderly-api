import { FindProductByCategoryIdUseCase } from 'src/application/usecases/checkin/products';
import { ProductSequelizeRepository } from 'src/infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import {
  FindProductByCategoryIdController,
  IFindProductByCategoryIdController,
} from 'src/presentation/checkin/products/controllers/find-product-bycategoryid.controller';

export class FindProductByCategoryIdFactory {
  static register(): IFindProductByCategoryIdController {
    const productRepository = new ProductSequelizeRepository();

    const findProductByCategoryIdUseCase = new FindProductByCategoryIdUseCase(
      productRepository,
    );
    return new FindProductByCategoryIdController(
      findProductByCategoryIdUseCase,
    );
  }
}
