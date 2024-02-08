import { NotFoundException } from 'src/application/errors';
import { DomainException } from 'src/domain/@shared/errors';
import { VerifyProductDto } from 'src/domain/checkin/products/dto/verify-product.dto';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { ICheckProductQuantityUseCase } from 'src/domain/checkin/products/usecases/check-product-quantity.usecase';

export class CheckProductQuantityUseCase
  implements ICheckProductQuantityUseCase
{
  constructor(private productRepository: IProductRepository) {}

  async execute(products: VerifyProductDto[]): Promise<void> {
    for (const p of products) {
      const product = await this.productRepository.findOne(p.id);
      if (!product) {
        throw new NotFoundException('product not exists');
      }
      const quantity = product.quantity - p.quantity;
      const isEnough = quantity >= 0;
      if (!isEnough) {
        throw new DomainException('product quantity is not enough.');
      }

      await this.productRepository.updateQuantity(product.id, quantity);
    }
  }
}
