import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { IDeleteProductUseCase } from 'src/domain/checkin/products/usecases/delete-product.usecase';

@Injectable()
export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
