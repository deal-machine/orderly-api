import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { IDeleteProductUseCase } from 'src/domain/checkin/products/usecases/delete-product.usecase';

export class DeleteProductUseCase implements IDeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
