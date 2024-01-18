import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { Category } from '../entities/category.entity';

export interface IGetCategoriesUseCase extends IUseCase<null, Category[]> {
  execute(): Promise<Category[]>;
}
