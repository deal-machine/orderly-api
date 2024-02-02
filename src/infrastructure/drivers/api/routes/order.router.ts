import { Request, Response } from 'express';
import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { FindCustomerByIdFactory } from 'src/main/checkin/customers';
import { CheckProductQuantityFactory } from 'src/main/checkin/products';
import {
  CreateOrderFactory,
  FindOrdersFactory,
  GetOrderStatusFactory,
  GetReportByCustomerIdFactory,
  PrepareOrderFactory,
  WithdrawnOrderFactory,
} from 'src/main/checkout';

@Controller('orders')
export class OrderRouter {
  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    const data = request['data'];

    const checkProductQuantityController =
      CheckProductQuantityFactory.register();
    const checkProductResponse =
      await checkProductQuantityController.handle(data);

    if (checkProductResponse.statusCode !== 200) {
      return response
        .status(checkProductResponse.statusCode)
        .json(checkProductResponse.body);
    }

    const createOrderController = CreateOrderFactory.register();
    const { body, statusCode } = await createOrderController.handle(data);
    return response.status(statusCode).json(body);
  }

  @Post(':id/prepare')
  async prepare(@Req() request: Request, @Res() response: Response) {
    const prepareOrderController = PrepareOrderFactory.register();
    const { body, statusCode } = await prepareOrderController.handle(
      request['data'],
    );
    return response.status(statusCode).json(body);
  }

  @Post(':id/withdrawn')
  async withdrawn(@Req() request: Request, @Res() response: Response) {
    const withdrawnOrderController = WithdrawnOrderFactory.register();
    const { body, statusCode } = await withdrawnOrderController.handle(
      request['data'],
    );
    return response.status(statusCode).json(body);
  }

  @Get()
  async getOrders(@Req() req: Request, @Res() res: Response) {
    const findOrdersController = FindOrdersFactory.register();
    const { body, statusCode } = await findOrdersController.handle(req['data']);

    return res.status(statusCode).json(body);
  }

  @Get(':id/status')
  async getStatus(@Req() req: Request, @Res() res: Response) {
    const getOrderStatusController = GetOrderStatusFactory.register();
    const { body, statusCode } = await getOrderStatusController.handle(
      req['data'],
    );

    return res.status(statusCode).json(body);
  }

  @Get('customer/:id')
  async getCustomerReport(@Req() req: Request, @Res() res: Response) {
    const data = req['data'];
    const findCustomerByIdController = FindCustomerByIdFactory.register();
    const {
      body: { customer },
    } = await findCustomerByIdController.handle(data);

    const getReportByCustomerIdController =
      GetReportByCustomerIdFactory.register();
    const { statusCode, body } = await getReportByCustomerIdController.handle({
      params: { id: customer.id },
    });

    return res.status(statusCode).json(body);
  }
}
