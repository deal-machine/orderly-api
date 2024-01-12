import { IUseCase } from 'src/domain/@shared/protocols/usecase';
import { IProduct } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

export interface ICreateProductUseCase
  extends IUseCase<CreateProductDto, IProduct> {
  execute(createProductDto: CreateProductDto): Promise<IProduct>;
}
