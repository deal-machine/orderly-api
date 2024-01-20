import { IUseCase } from 'src/domain/@shared/protocols/usecase';

export interface IWithdrawnOrderUseCase extends IUseCase<string, void> {
  execute(orderId: string): Promise<void>;
}
