import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { UpdateProductDto } from '../dto/update-product.dto';

export interface IUpdateProductInput {
  id: string;
  updateProductDto: UpdateProductDto;
}

export interface IUpdateProductUseCase
  extends IUseCase<IUpdateProductInput, void> {
  execute(input: IUpdateProductInput): Promise<void>;
}
