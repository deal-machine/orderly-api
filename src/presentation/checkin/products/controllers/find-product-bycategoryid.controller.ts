import { IProduct } from 'src/domain/checkin/products/entities/product.entity';
import { IFindProductByCategoryIdUseCase } from 'src/domain/checkin/products/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IFindProductByCategoryIdRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IFindProductByCategoryIdResponse extends IResponse {
  body: IProduct[];
}

export interface IFindProductByCategoryIdController extends IController {
  handle(
    request: IFindProductByCategoryIdRequest,
  ): Promise<IFindProductByCategoryIdResponse>;
}

export class FindProductByCategoryIdController
  implements IFindProductByCategoryIdController
{
  constructor(
    private findProductByCategoryIdUseCase: IFindProductByCategoryIdUseCase,
  ) {}

  async handle({
    params,
  }: IFindProductByCategoryIdRequest): Promise<IFindProductByCategoryIdResponse> {
    try {
      const { id } = params;
      const products = await this.findProductByCategoryIdUseCase.execute(id);
      return HttpPresenter.success({ products });
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
