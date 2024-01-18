import { IUseCase } from 'src/domain/@shared/protocols/usecase';

export interface IDeleteProductUseCase extends IUseCase<string, void> {
  execute(id: string): Promise<void>;
}
