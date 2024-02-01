import { GetCategoriesUseCase } from 'src/application/usecases/checkin/products';
import { ProductSequelizeRepository } from 'src/infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import {
  GetCategoriesController,
  IGetCategoriesController,
} from 'src/presentation/checkin/products/controllers/get-categories.controller';

export class GetCategoriesFactory {
  static register(): IGetCategoriesController {
    const productRepository = new ProductSequelizeRepository();

    const getCategoriesUseCase = new GetCategoriesUseCase(productRepository);
    return new GetCategoriesController(getCategoriesUseCase);
  }
}
