import { Product } from 'src/domain/checkin/products/entities/product.entity';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { IFindProductByCategoryIdUseCase } from 'src/domain/checkin/products/usecases/find-product-bycategoryid.usecase';

export class FindProductByCategoryIdUseCase
  implements IFindProductByCategoryIdUseCase
{
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<Product[]> {
    return this.productRepository.findByCategory(id);
  }
}
