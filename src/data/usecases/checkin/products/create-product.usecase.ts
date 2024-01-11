import { Inject, Injectable } from '@nestjs/common';
import { IIdentifierGenerator } from 'src/data/ports/tokens/id-generator';
import { CreateProductDto } from 'src/domain/checkin/product/dto/create-product.dto';
import {
  IProduct,
  Product,
} from 'src/domain/checkin/product/entities/product.entity';
import { IProductRepository } from 'src/domain/checkin/product/repositories/product.repository';
import { ICreateProductUseCase } from 'src/domain/checkin/product/usecases/create-product.usecase';

@Injectable()
export class CreateProductUseCase implements ICreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository,
    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  async execute(createProductDto: CreateProductDto): Promise<IProduct> {
    console.log('here in use case');
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
}
