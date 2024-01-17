import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Inject,
} from '@nestjs/common';
import { OrdersService } from './order.service';

import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';
import { IFindCustomerByIdUseCase } from 'src/domain/checkin/customers/usecases/find-customer-byid.usecase';
import { ICheckProductQuantityUseCase } from 'src/domain/checkin/products/usecases/check-product-quantity.usecase';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly ordersService: OrdersService,
    @Inject('FindCustomerByIdUseCase')
    private findCustomerByIdUseCase: IFindCustomerByIdUseCase,
    @Inject('CheckProductQuantityUseCase')
    private checkProductQuantityUseCase: ICheckProductQuantityUseCase,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      await this.checkProductQuantityUseCase.execute(createOrderDto.products);
      return await this.ordersService.create(createOrderDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':id/prepare')
  async prepare(@Param('id') id: string) {
    try {
      return await this.ordersService.prepare(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':id/withdrawn')
  async withdrawn(@Param('id') id: string) {
    try {
      return await this.ordersService.withdrawn(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get()
  async getOrders(
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
  ) {
    try {
      return await this.ordersService.findAll(customerId, status);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get(':id/status')
  async getStatus(@Param('id') id: string) {
    try {
      return await this.ordersService.getStatus(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get('customer/:id')
  async getCustomerReport(@Param('id') id: string) {
    try {
      await this.findCustomerByIdUseCase.execute(id);
      return await this.ordersService.getCustomerReport(id);
    } catch (err: any) {
      responseError(err);
    }
  }
}
