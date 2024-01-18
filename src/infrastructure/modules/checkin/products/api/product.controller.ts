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
import { CreateProductDto } from 'src/domain/checkin/products/dto/create-product.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';
import { UpdateProductDto } from 'src/domain/checkin/products/dto/update-product.dto';
import { ICreateProductUseCase } from 'src/domain/checkin/products/usecases/create-product.usecase';
import { IUpdateProductUseCase } from 'src/domain/checkin/products/usecases/update-product.usecase';
import { IDeleteProductUseCase } from 'src/domain/checkin/products/usecases/delete-product.usecase';
import { IFindProductByCategoryIdUseCase } from 'src/domain/checkin/products/usecases/find-product-bycategoryid.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productsService: ProductsService,
    @Inject('CreateProductUseCase')
    private readonly createProductUseCase: ICreateProductUseCase,
    @Inject('UpdateProductUseCase')
    private readonly updateProductUseCase: IUpdateProductUseCase,
    @Inject('DeleteProductUseCase')
    private readonly deleteProductUseCase: IDeleteProductUseCase,
    @Inject('FindProductByCategoryIdUseCase')
    private readonly findProductByCategoryIdUseCase: IFindProductByCategoryIdUseCase,
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
      await this.updateProductUseCase.execute({ id, updateProductDto });
    } catch (err: any) {
      responseError(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.deleteProductUseCase.execute(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get('category/:id')
  async findByCategory(@Param('id') id: number) {
    try {
      return await this.findProductByCategoryIdUseCase.execute(id);
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
