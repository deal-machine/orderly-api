import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { VerifyProductDto } from '../dto/verify-product.dto';

export interface ICheckProductQuantityUseCase
  extends IUseCase<VerifyProductDto[], void> {
  execute(products: VerifyProductDto[]): Promise<void>;
}
