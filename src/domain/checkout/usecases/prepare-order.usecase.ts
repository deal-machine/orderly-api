import { IUseCase } from 'src/domain/@shared/protocols/usecase';

export interface IPrepareOrderUseCase extends IUseCase<string, void> {
  execute(orderId: string): Promise<void>;
}
