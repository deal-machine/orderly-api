import { UpdateProductDto } from 'src/domain/checkin/products/dto/update-product.dto';
import { IUpdateProductUseCase } from 'src/domain/checkin/products/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IUpdateProductRequest extends IRequest {
  params: {
    id: string;
  };
  body: UpdateProductDto;
}
export interface IUpdateProductResponse extends IResponse {}

export interface IUpdateProductController extends IController {
  handle(request: IUpdateProductRequest): Promise<IUpdateProductResponse>;
}

export class UpdateProductController implements IUpdateProductController {
  constructor(private updateProductUseCase: IUpdateProductUseCase) {}

  async handle({
    body,
    params,
  }: IUpdateProductRequest): Promise<IUpdateProductResponse> {
    try {
      await this.updateProductUseCase.execute({
        id: params.id,
        updateProductDto: body,
      });
      return HttpPresenter.success({});
    } catch (error) {
      return HttpPresenter.serverError();
    }
  }
}
