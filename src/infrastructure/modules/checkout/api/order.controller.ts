import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Inject,
} from '@nestjs/common';

import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';
import { IFindCustomerByIdUseCase } from 'src/domain/checkin/customers/usecases/find-customer-byid.usecase';
import { ICheckProductQuantityUseCase } from 'src/domain/checkin/products/usecases/check-product-quantity.usecase';
import { ICreateOrderUseCase } from 'src/domain/checkout/usecases/create-order.usecase';
import { IPrepareOrderUseCase } from 'src/domain/checkout/usecases/prepare-order.usecase';
import { IWithdrawnOrderUseCase } from 'src/domain/checkout/usecases/withdrawn-order.usecase';
import { IFindOrdersUseCase } from 'src/domain/checkout/usecases/find-orders.usecase';
import { IGetOrderStatusUseCase } from 'src/domain/checkout/usecases/get-orderstatus.usecase';
import { IGetOrderReportByCustomerIdUseCase } from 'src/domain/checkout/usecases/get-orderreport-bycustomerid.usecase';

@Controller('orders')
export class OrderController {
  constructor(
    @Inject('CreateOrderUseCase')
    private readonly createOrderUseCase: ICreateOrderUseCase,
    @Inject('PrepareOrderUseCase')
    private readonly prepareOrderUseCase: IPrepareOrderUseCase,
    @Inject('WithdrawnOrderUseCase')
    private readonly withdrawnOrderUseCase: IWithdrawnOrderUseCase,
    @Inject('FindOrdersUseCase')
    private readonly findOrdersUseCase: IFindOrdersUseCase,
    @Inject('GetOrderStatusUseCase')
    private readonly getOrderStatusUseCase: IGetOrderStatusUseCase,
    @Inject('GetOrderReportByCustomerIdUseCase')
    private readonly getOrderReportByCustomerIdUseCase: IGetOrderReportByCustomerIdUseCase,
    @Inject('FindCustomerByIdUseCase')
    private findCustomerByIdUseCase: IFindCustomerByIdUseCase,
    @Inject('CheckProductQuantityUseCase')
    private checkProductQuantityUseCase: ICheckProductQuantityUseCase,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      await this.checkProductQuantityUseCase.execute(createOrderDto.products);
      return await this.createOrderUseCase.execute(createOrderDto);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':id/prepare')
  async prepare(@Param('id') id: string) {
    try {
      return await this.prepareOrderUseCase.execute(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Post(':id/withdrawn')
  async withdrawn(@Param('id') id: string) {
    try {
      return await this.withdrawnOrderUseCase.execute(id);
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
      return await this.findOrdersUseCase.execute({ customerId, status });
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get(':id/status')
  async getStatus(@Param('id') id: string) {
    try {
      return await this.getOrderStatusUseCase.execute(id);
    } catch (err: any) {
      responseError(err);
    }
  }

  @Get('customer/:id')
  async getCustomerReport(@Param('id') id: string) {
    try {
      await this.findCustomerByIdUseCase.execute(id);
      return await this.getOrderReportByCustomerIdUseCase.execute(id);
    } catch (err: any) {
      responseError(err);
    }
  }
}
