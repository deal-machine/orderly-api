import {
  IGetOrderStatusOutput,
  IGetOrderStatusUseCase,
} from 'src/domain/checkout/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IGetOrderStatusRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IGetOrderStatusResponse extends IResponse {
  body: IGetOrderStatusOutput;
}

export interface IGetOrderStatusController extends IController {
  handle(request: IGetOrderStatusRequest): Promise<IGetOrderStatusResponse>;
}

export class GetOrderStatusController implements IGetOrderStatusController {
  constructor(private GetOrderStatusUseCase: IGetOrderStatusUseCase) {}

  async handle({
    params,
  }: IGetOrderStatusRequest): Promise<IGetOrderStatusResponse> {
    try {
      const { id } = params;

      const status = await this.GetOrderStatusUseCase.execute(id);

      return HttpPresenter.success({ status });
    } catch (error) {
      console.log('GetOrderStatusController', error);
      return HttpPresenter.badRequest(error);
    }
  }
}
