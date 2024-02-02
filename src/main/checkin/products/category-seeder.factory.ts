import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { ProductSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/product-sequelize.repository';
import { CategorySeeder } from 'src/infrastructure/drivers/database/seeders/category-seeder';

export class CategorySeederFactory {
  static init(): CategorySeeder {
    const productRepository = new ProductSequelizeRepository();
    const idGenerator = new Uuid();
    return new CategorySeeder(productRepository, idGenerator);
  }
}
