import { CreateProductDto } from 'src/domain/checkin/products/dto/create-product.dto';
import { IProduct } from 'src/domain/checkin/products/entities/product.entity';
import { ICreateProductUseCase } from 'src/domain/checkin/products/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface ICreateProductRequest extends IRequest {
  body: CreateProductDto;
}
export interface ICreateProductResponse extends IResponse {
  body: IProduct;
}
export interface ICreateProductController extends IController {
  handle(request: ICreateProductRequest): Promise<ICreateProductResponse>;
}

export class CreateProductController implements ICreateProductController {
  constructor(private readonly createProductUseCase: ICreateProductUseCase) {}

  async handle({
    body,
  }: ICreateProductRequest): Promise<ICreateProductResponse> {
    try {
      const product = await this.createProductUseCase.execute(body);
      return HttpPresenter.success({ product });
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
