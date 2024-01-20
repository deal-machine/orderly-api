import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import { IGetOrderReportByCustomerIdUseCase } from 'src/domain/checkout/usecases/get-orderreport-bycustomerid.usecase';

@Injectable()
export class GetOrderReportByCustomerIdUseCase
  implements IGetOrderReportByCustomerIdUseCase
{
  constructor(
    @Inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  async execute(customerId: string) {
    return await this.orderRepository.getReportByCustomer(customerId);
  }
}
