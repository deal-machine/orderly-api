import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './order.service';

import { ProductsService } from '../../checkin/product/api/product.service';
import { CustomersService } from '../../checkin/customer/api/customer.service';
import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService,
    private readonly customerService: CustomersService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      await this.productsService.verifyProductQuantity(createOrderDto.products);
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
      await this.customerService.findById(id);
      return await this.ordersService.getCustomerReport(id);
    } catch (err: any) {
      responseError(err);
    }
  }
}
