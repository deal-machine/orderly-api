import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import { IGetOrderReportByCustomerIdUseCase } from 'src/domain/checkout/usecases/get-orderreport-bycustomerid.usecase';

export class GetOrderReportByCustomerIdUseCase
  implements IGetOrderReportByCustomerIdUseCase
{
  constructor(private orderRepository: IOrderRepository) {}

  async execute(customerId: string) {
    return await this.orderRepository.getReportByCustomer(customerId);
  }
}
