import { VerifyProductDto } from 'src/domain/checkin/products/dto/verify-product.dto';
import { ICheckProductQuantityUseCase } from 'src/domain/checkin/products/usecases';
import { IOrder } from 'src/domain/checkout/entities/order.entity';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface ICheckProductQuantityRequest extends IRequest {
  body: { products: VerifyProductDto[] };
}
export interface ICheckProductQuantityResponse extends IResponse {
  body: IOrder;
}
export interface ICheckProductQuantityController extends IController {
  handle(
    request: ICheckProductQuantityRequest,
  ): Promise<ICheckProductQuantityResponse>;
}

export class CheckProductQuantityController
  implements ICheckProductQuantityController
{
  constructor(
    private checkProductQuantityUseCase: ICheckProductQuantityUseCase,
  ) {}

  async handle({
    body,
  }: ICheckProductQuantityRequest): Promise<ICheckProductQuantityResponse> {
    try {
      const { products } = body;

      await this.checkProductQuantityUseCase.execute(products);

      return HttpPresenter.success({});
    } catch (error) {
      console.log('CheckProductQuantityController', error);
      return HttpPresenter.badRequest(error);
    }
  }
}
