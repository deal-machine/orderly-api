import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { IApprovePaymentByOrderIdUseCase } from 'src/domain/financial/usecases/approve-payment-byorderid.usecase';
import { ICancelPaymentByOrderIdUseCase } from 'src/domain/financial/usecases/cancel-payment-byorderid.usecase';
import { IFindPaymentByOrderId } from 'src/domain/financial/usecases/find-payment-byorderid.usecase';
import { responseError } from 'src/infrastructure/drivers/api/presenters/reponse.error';

@Controller('payments')
export class PaymentController {
  constructor(
    @Inject('ApprovePaymentByOrderIdUseCase')
    private readonly approvePaymentByOrderIdUseCase: IApprovePaymentByOrderIdUseCase,
    @Inject('CancelPaymentByOrderIdUseCase')
    private readonly cancelPaymentByOrderIdUseCase: ICancelPaymentByOrderIdUseCase,
    @Inject('FindPaymentByOrderId')
    private readonly findPaymentByOrderId: IFindPaymentByOrderId,
  ) {}

  @Post('order/:id/approve')
  async approve(@Param('id') id: string) {
    try {
      return await this.approvePaymentByOrderIdUseCase.execute(id);
    } catch (err) {
      responseError(err);
    }
  }

  @Delete('order/:id/cancel')
  async cancel(@Param('id') id: string) {
    try {
      return await this.cancelPaymentByOrderIdUseCase.execute(id);
    } catch (err) {
      responseError(err);
    }
  }

  @Get('order/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.findPaymentByOrderId.execute(id);
    } catch (err) {
      responseError(err);
    }
  }
}
