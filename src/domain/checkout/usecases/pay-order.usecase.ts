import { IUseCase } from 'src/domain/@shared/protocols/usecase';

export interface IPayOrderUseCaseInput {
  orderId: string;
  status: string;
}
export interface IPayOrderUseCase
  extends IUseCase<IPayOrderUseCaseInput, void> {
  execute(payment: IPayOrderUseCaseInput): Promise<void>;
}
