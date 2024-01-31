import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/domain/checkin/products/entities/product.entity';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { IFindProductByCategoryIdUseCase } from 'src/domain/checkin/products/usecases/find-product-bycategoryid.usecase';

@Injectable()
export class FindProductByCategoryIdUseCase
  implements IFindProductByCategoryIdUseCase
{
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number): Promise<Product[]> {
    return this.productRepository.findByCategory(id);
  }
}
