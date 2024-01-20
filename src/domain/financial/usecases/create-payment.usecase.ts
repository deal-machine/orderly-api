import { IUseCase } from 'src/domain/@shared/protocols/usecase';

export interface ICreatePaymentInput {
  customerId: string;
  orderId: string;
  total: number;
}
export interface ICreatePaymentUseCase
  extends IUseCase<ICreatePaymentInput, void> {
  execute(input: ICreatePaymentInput): Promise<void>;
}
