import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { Product } from '../entities/product.entity';

export interface IFindProductByCategoryIdUseCase
  extends IUseCase<string, Product[]> {
  execute(id: string): Promise<Product[]>;
}
