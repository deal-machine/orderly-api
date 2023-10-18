import { Inject, Injectable } from '@nestjs/common';
import { UpdateProductDto } from 'src/internal/domain/product/dto/update-product.dto';
import { CreateProductDto } from 'src/internal/domain/product/dto/create-product.dto';
import { IProductRepository } from 'src/internal/domain/product/repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // se um produto já existe ele adiciona quantidade
    return this.productRepository.create(createProductDto);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  async delete(id: string) {
    return this.productRepository.delete(id);
  }

  async findByCategory(category: string) {
    return this.productRepository.findByCategory(category);
  }
}
