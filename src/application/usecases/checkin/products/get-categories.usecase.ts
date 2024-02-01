import { ICategory } from 'src/domain/checkin/products/entities/category.entity';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { IGetCategoriesUseCase } from 'src/domain/checkin/products/usecases/get-categories.usecase';

export class GetCategoriesUseCase implements IGetCategoriesUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<ICategory[]> {
    return this.productRepository.getCategories();
  }
}
