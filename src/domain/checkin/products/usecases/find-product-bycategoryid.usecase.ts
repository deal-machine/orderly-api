import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { Product } from '../entities/product.entity';

export interface IFindProductByCategoryIdUseCase
  extends IUseCase<number, Product[]> {
  execute(id: number): Promise<Product[]>;
}
