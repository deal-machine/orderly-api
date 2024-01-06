import { Controller, Get, Post, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':id')
  make(@Param('id') id: string) {
    return this.paymentService.make(id);
  }

  @Get(':orderId')
  findOne(@Param('orderId') orderId: string) {
    return this.paymentService.findOneByOrderId(orderId);
  }
}
