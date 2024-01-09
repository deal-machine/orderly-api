import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { OrdersService } from './order.service';
import { CreateOrderDto } from 'src/internal/domain/checkout/dto/create-order.dto';
import { ProductsService } from '../product/product.service';
import { responseError } from 'src/external/infra/errors/reponse.error';
import { CustomersService } from '../customer/customer.service';

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
      return this.ordersService.create(createOrderDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':id/prepare')
  prepare(@Param('id') id: string) {
    try {
      return this.ordersService.prepare(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':id/withdrawn')
  withdrawn(@Param('id') id: string) {
    try {
      return this.ordersService.withdrawn(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get()
  getOrders(
    @Query('customerId') customerId?: string,
    @Query('status') status?: string,
  ) {
    try {
      return this.ordersService.findAll(customerId, status);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get('customer/:id')
  async getCustomerReport(@Param('id') id: string) {
    try {
      await this.customerService.findById(id);
      return this.ordersService.getCustomerReport(id);
    } catch (err: any) {
      responseError(err);
    }
  }
}
