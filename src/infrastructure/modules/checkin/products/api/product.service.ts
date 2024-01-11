import { Inject, Injectable } from '@nestjs/common';
import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { DomainException } from 'src/application/errors';
import EventEmitter from 'events';
import { IProductRepository } from 'src/domain/checkin/products/repositories/product.repository';
import { CreateProductDto } from 'src/domain/checkin/products/dto/create-product.dto';
import { Product } from 'src/domain/checkin/products/entities/product.entity';
import { UpdateProductDto } from 'src/domain/checkin/products/dto/update-product.dto';
import { VerifyProductDto } from 'src/domain/checkin/products/dto/verify-product.dto';
import { ProductDecreasedEvent } from 'src/domain/checkin/products/events/product-decreased.event';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository,

    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,

    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // se um produto já existe ele adiciona quantidade
    const product = new Product({
      id: this.idGenerator.generate(),
      name: createProductDto.name,
      categoryId: createProductDto.categoryId,
      description: createProductDto.description,
      price: createProductDto.price,
      quantity: createProductDto.quantity,
    });
    await this.productRepository.create(product);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async verifyProductQuantity(products: VerifyProductDto[]) {
    const productVerified = [];
    for (const p of products) {
      const product = await this.productRepository.findOne(p.id);
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

  async delete(id: string) {
    return this.productRepository.delete(id);
  }

  async findByCategory(id: number) {
    return this.productRepository.findByCategory(id);
  }

  async getCategories() {
    return this.productRepository.getCategories();
  }
}
