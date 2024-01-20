import { IUseCase } from 'src/domain/@shared/protocols/usecase';

export interface IGetOrderReportByCustomerIdOutput {
  purchases: number;
  value: number;
}

export interface IGetOrderReportByCustomerIdUseCase
  extends IUseCase<string, IGetOrderReportByCustomerIdOutput> {
  execute(customerId: string): Promise<IGetOrderReportByCustomerIdOutput>;
}
