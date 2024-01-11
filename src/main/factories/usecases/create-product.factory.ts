import { CreateProductUseCase } from 'src/data/usecases/checkin/products/create-product.usecase';
import { Uuid } from 'src/infrastructure/adapters/tokens/uuid/uuid';
import { CategoryModel } from 'src/infrastructure/modules/checkin/products/sequelize/category.model';
import { ProductSequelizeRepository } from 'src/infrastructure/modules/checkin/products/sequelize/product-sequelize.repository';
import { ProductModel } from 'src/infrastructure/modules/checkin/products/sequelize/product.model';

const productModel = new ProductModel();
const categoryModel = new CategoryModel();
const productRepository = new ProductSequelizeRepository(
  productModel as any,
  categoryModel as any,
);
const idGenerator = new Uuid();
const createProductUseCase = new CreateProductUseCase(
  productRepository,
  idGenerator,
);
export { createProductUseCase };
