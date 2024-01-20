import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { IApprovePaymentByOrderIdUseCase } from 'src/domain/financial/usecases/approve-payment-byorderid.usecase';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('ApprovePaymentByOrderIdUseCase')
    private readonly approvePaymentByOrderIdUseCase: IApprovePaymentByOrderIdUseCase,
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
  cancel(@Param('id') id: string) {
    return this.paymentService.cancelByOrderId(id);
  }

  @Get('order/:id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOneByOrderId(id);
  }
}
