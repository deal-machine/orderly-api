import { IDeleteProductUseCase } from 'src/domain/checkin/products/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IDeleteProductRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IDeleteProductResponse extends IResponse {}

export interface IDeleteProductController extends IController {
  handle(request: IDeleteProductRequest): Promise<IDeleteProductResponse>;
}

export class DeleteProductController implements IDeleteProductController {
  constructor(private deleteProductUseCase: IDeleteProductUseCase) {}

  async handle({
    params,
  }: IDeleteProductRequest): Promise<IDeleteProductResponse> {
    try {
      const { id } = params;
      await this.deleteProductUseCase.execute(id);
      return HttpPresenter.success({});
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
