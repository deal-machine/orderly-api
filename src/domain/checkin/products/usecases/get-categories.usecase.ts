import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { ICategory } from '../entities/category.entity';

export interface IGetCategoriesUseCase extends IUseCase<null, ICategory[]> {
  execute(): Promise<ICategory[]>;
}
