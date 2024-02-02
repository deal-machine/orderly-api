import { IPrepareOrderUseCase } from 'src/domain/checkout/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IPrepareOrderRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IPrepareOrderResponse extends IResponse {}

export interface IPrepareOrderController extends IController {
  handle(request: IPrepareOrderRequest): Promise<IPrepareOrderResponse>;
}

export class PrepareOrderController implements IPrepareOrderController {
  constructor(private prepareOrderUseCase: IPrepareOrderUseCase) {}

  async handle({
    params,
  }: IPrepareOrderRequest): Promise<IPrepareOrderResponse> {
    try {
      const { id } = params;

      await this.prepareOrderUseCase.execute(id);

      return HttpPresenter.success({});
    } catch (error) {
      console.log('PrepareOrderController', error);
      return HttpPresenter.badRequest(error);
    }
  }
}
