import { Controller, Get, Post, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':id')
  make(@Param('id') id: string) {
    return this.paymentService.make(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(id);
  }
}
