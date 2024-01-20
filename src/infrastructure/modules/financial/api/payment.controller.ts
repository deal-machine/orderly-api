import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { IApprovePaymentByOrderIdUseCase } from 'src/domain/financial/usecases/approve-payment-byorderid.usecase';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';
import { ICancelPaymentByOrderIdUseCase } from 'src/domain/financial/usecases/cancel-payment-byorderid.usecase';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('ApprovePaymentByOrderIdUseCase')
    private readonly approvePaymentByOrderIdUseCase: IApprovePaymentByOrderIdUseCase,
    private readonly cancelPaymentByOrderIdUseCase: ICancelPaymentByOrderIdUseCase,
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
  findOne(@Param('id') id: string) {
    return this.paymentService.findOneByOrderId(id);
  }
}
