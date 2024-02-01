import { NotFoundException } from 'src/application/errors';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import {
  IUpdateProductInput,
  IUpdateProductUseCase,
} from 'src/domain/checkin/products/usecases/update-product.usecase';

export class UpdateProductUseCase implements IUpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute({ id, updateProductDto }: IUpdateProductInput): Promise<void> {
    const product = await this.productRepository.findOne(id);
    if (!product) throw new NotFoundException('product not found');
    await this.productRepository.update(id, updateProductDto);
  }
}
