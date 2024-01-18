import { Inject, Injectable } from '@nestjs/common';
import { Category } from 'src/domain/checkin/products/entities/category.entity';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { IGetCategoriesUseCase } from 'src/domain/checkin/products/usecases/get-categories.usecase';

@Injectable()
export class GetCategoriesUseCase implements IGetCategoriesUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Category[]> {
    return this.productRepository.getCategories();
  }
}
