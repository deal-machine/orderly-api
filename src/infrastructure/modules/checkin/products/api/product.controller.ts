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
import { CreateProductDto } from 'src/domain/checkin/products/dto/create-product.dto';
import { responseError } from 'src/infrastructure/drivers/api/presenters/output/reponse.error';
import { UpdateProductDto } from 'src/domain/checkin/products/dto/update-product.dto';
import {
  ICreateProductUseCase,
  IDeleteProductUseCase,
  IFindProductByCategoryIdUseCase,
  IGetCategoriesUseCase,
  IUpdateProductUseCase,
} from 'src/domain/checkin/products/usecases';

@Controller('products')
export class ProductController {
  constructor(
    @Inject('CreateProductUseCase')
    private readonly createProductUseCase: ICreateProductUseCase,
    @Inject('UpdateProductUseCase')
    private readonly updateProductUseCase: IUpdateProductUseCase,
    @Inject('DeleteProductUseCase')
    private readonly deleteProductUseCase: IDeleteProductUseCase,
    @Inject('FindProductByCategoryIdUseCase')
    private readonly findProductByCategoryIdUseCase: IFindProductByCategoryIdUseCase,
    @Inject('GetCategoriesUseCase')
    private readonly getCategoriesUseCase: IGetCategoriesUseCase,
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
      return await this.getCategoriesUseCase.execute();
    } catch (err: any) {
      responseError(err);
    }
  }
}
