import { NotFoundException } from 'src/application/errors';
import { IEventEmitter } from 'src/application/ports/events/event-emitter';
import { DomainException } from 'src/domain/@shared/errors';
import { VerifyProductDto } from 'src/domain/checkin/products/dto/verify-product.dto';
import { ProductDecreasedEvent } from 'src/domain/checkin/products/events/product-decreased.event';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { ICheckProductQuantityUseCase } from 'src/domain/checkin/products/usecases/check-product-quantity.usecase';

export class CheckProductQuantityUseCase
  implements ICheckProductQuantityUseCase
{
  constructor(
    private productRepository: IProductRepository,
    private eventEmitter: IEventEmitter,
  ) {}

  async execute(products: VerifyProductDto[]): Promise<void> {
    const productVerified = [];
    for (const p of products) {
      const product = await this.productRepository.findOne(p.id);
      if (!product) throw new NotFoundException('product not exists');
      const quantity = product.quantity - p.quantity;
      const isEnough = quantity >= 0;
      if (!isEnough)
        throw new DomainException('product quantity is not enough.');

      productVerified.push({ id: product.id, quantity, value: product.price });
    }

    this.eventEmitter.emit(
      'product.verified',
      new ProductDecreasedEvent(productVerified),
    );
  }
}
