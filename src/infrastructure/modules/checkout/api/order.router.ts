import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Inject,
  Req,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';
import { ICheckProductQuantityUseCase } from 'src/domain/checkin/products/usecases/check-product-quantity.usecase';
import {
  ICreateOrderUseCase,
  IFindOrdersUseCase,
  IGetOrderReportByCustomerIdUseCase,
  IGetOrderStatusUseCase,
  IPrepareOrderUseCase,
  IWithdrawnOrderUseCase,
} from 'src/domain/checkout/usecases';
import { responseError } from 'src/infrastructure/drivers/api/presenters/reponse.error';
import { FindCustomerByIdFactory } from 'src/main/checkin/customers/find-customer-byid';
import { Request } from 'express';

@Controller('orders')
export class OrderRouter {
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
  async getCustomerReport(@Req() req: Request) {
    try {
      const findCustomerByIdController = FindCustomerByIdFactory.register();
      const findCustomer = await findCustomerByIdController.handle(req['data']);
      const { customer } = findCustomer.body;
      return await this.getOrderReportByCustomerIdUseCase.execute(customer.id);
    } catch (err: any) {
      responseError(err);
    }
  }
}
