import { IUseCase } from 'src/data/ports/usecases/usecase';
import { IProduct } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

export interface ICreateProductUseCase
  extends IUseCase<CreateProductDto, IProduct> {
  execute(createProductDto: CreateProductDto): Promise<IProduct>;
}
