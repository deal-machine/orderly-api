import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Get,
  Inject,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from 'src/domain/checkin/product/dto/create-product.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';
import { UpdateProductDto } from 'src/domain/checkin/product/dto/update-product.dto';
import { ICreateProductUseCase } from 'src/domain/checkin/product/usecases/create-product.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('CreateProductUseCase')
    private readonly createProductUseCase: ICreateProductUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return await this.createProductUseCase.execute(createProductDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await this.productsService.update(id, updateProductDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.productsService.delete(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get('category/:id')
  async findByCategory(@Param('id') id: number) {
    try {
      return await this.productsService.findByCategory(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get('category/')
  async getCategories() {
    try {
      return await this.productsService.getCategories();
    } catch (err: any) {
      responseError(err);
    }
  }
}
