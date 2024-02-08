import { IWithdrawnOrderUseCase } from 'src/domain/checkout/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IWithdrawnOrderRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IWithdrawnOrderResponse extends IResponse {}

export interface IWithdrawnOrderController extends IController {
  handle(request: IWithdrawnOrderRequest): Promise<IWithdrawnOrderResponse>;
}

export class WithdrawnOrderController implements IWithdrawnOrderController {
  constructor(private withdrawnOrderUseCase: IWithdrawnOrderUseCase) {}

  async handle({
    params,
  }: IWithdrawnOrderRequest): Promise<IWithdrawnOrderResponse> {
    try {
      const { id } = params;
      await this.withdrawnOrderUseCase.execute(id);
      return HttpPresenter.success({});
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
