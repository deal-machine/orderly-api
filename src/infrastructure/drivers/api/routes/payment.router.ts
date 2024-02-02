import { Request, Response } from 'express';
import { Controller, Delete, Get, Post, Req, Res } from '@nestjs/common';
import {
  ApprovePaymentByOrderIdFactory,
  CancelPaymentByOrderIdFactory,
  FindPaymentByOrderIdFactory,
} from 'src/main/financial';

@Controller('payments')
export class PaymentRouter {
  @Post('order/:id/approve')
  async approve(@Req() req: Request, @Res() res: Response) {
    const approvePaymentByOrderIdController =
      ApprovePaymentByOrderIdFactory.register();
    const { body, statusCode } = await approvePaymentByOrderIdController.handle(
      req['data'],
    );
    return res.status(statusCode).json(body);
  }

  @Delete('order/:id/cancel')
  async cancel(@Req() req: Request, @Res() res: Response) {
    const cancelPaymentByOrderIdController =
      CancelPaymentByOrderIdFactory.register();
    const { body, statusCode } = await cancelPaymentByOrderIdController.handle(
      req['data'],
    );
    return res.status(statusCode).json(body);
  }

  @Get('order/:id')
  async findOne(@Req() req: Request, @Res() res: Response) {
    const findPaymentByOrderIdController =
      FindPaymentByOrderIdFactory.register();
    const { body, statusCode } = await findPaymentByOrderIdController.handle(
      req['data'],
    );
    return res.status(statusCode).json(body);
  }
}
