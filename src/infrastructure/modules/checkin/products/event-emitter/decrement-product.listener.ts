import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ProductDecreasedEvent } from 'src/domain/checkin/products/events/product-decreased.event';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';

@Injectable()
export class DecrementProductListener {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  @OnEvent('product.verified')
  async handle(event: ProductDecreasedEvent) {
    const products = event.product;

    await Promise.all(
      products.map(async (p) => {
        await this.productRepository.updateQuantity(p.id, p.quantity);
      }),
    );
  }
}
