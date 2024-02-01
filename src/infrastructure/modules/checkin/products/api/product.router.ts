import { Controller, Post, Put, Delete, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CreateProductFactory,
  DeleteProductFactory,
  UpdateProductFactory,
  FindProductByCategoryIdFactory,
  GetCategoriesFactory,
} from 'src/main/checkin/products';

@Controller('products')
export class ProductRouter {
  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    const controller = CreateProductFactory.register();
    const result = await controller.handle(request['data']);
    return response.status(result.statusCode).json(result.body);
  }

  @Put(':id')
  async update(@Req() request: Request, @Res() response: Response) {
    const controller = UpdateProductFactory.register();
    const result = await controller.handle(request['data']);
    return response.status(result.statusCode).json(result.body);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Res() response: Response) {
    const controller = DeleteProductFactory.register();
    const result = await controller.handle(request['data']);
    return response.status(result.statusCode).json(result.body);
  }

  @Get('category/:id')
  async findByCategory(@Req() request: Request, @Res() response: Response) {
    const controller = FindProductByCategoryIdFactory.register();
    const result = await controller.handle(request['data']);
    return response.status(result.statusCode).json(result.body);
  }

  @Get('category/')
  async getCategories(@Res() response: Response) {
    const controller = GetCategoriesFactory.register();
    const result = await controller.handle();
    return response.status(result.statusCode).json(result.body);
  }
}
