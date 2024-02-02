import { IOrder } from 'src/domain/checkout/entities/order.entity';
import { IFindOrdersUseCase } from 'src/domain/checkout/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IFindOrdersRequest extends IRequest {
  query: {
    customerId?: string;
    status?: string;
  };
}
export interface IFindOrdersResponse extends IResponse {
  body: IOrder[];
}

export interface IFindOrdersController extends IController {
  handle(request: IFindOrdersRequest): Promise<IFindOrdersResponse>;
}

export class FindOrdersController implements IFindOrdersController {
  constructor(private findOrdersUseCase: IFindOrdersUseCase) {}

  async handle({ query }: IFindOrdersRequest): Promise<IFindOrdersResponse> {
    try {
      const { customerId, status } = query;

      const orders = await this.findOrdersUseCase.execute({
        customerId,
        status,
      });

      return HttpPresenter.success({ orders });
    } catch (error) {
      console.log('FindOrdersController', error);
      return HttpPresenter.badRequest(error);
    }
  }
}
