import { IUseCase } from 'src/domain/@shared/protocols/usecase';

export interface IGetOrderStatusOutput {
  status: string;
  timeToWait: string;
}

export interface IGetOrderStatusUseCase
  extends IUseCase<string, IGetOrderStatusOutput> {
  execute(id: string): Promise<IGetOrderStatusOutput>;
}
