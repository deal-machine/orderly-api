import { IPayment } from 'src/domain/financial/entities/payment.entity';
import { IFindPaymentByOrderIdUseCase } from 'src/domain/financial/usecases/find-payment-byorderid.usecase';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IFindPaymentByOrderIdRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IFindPaymentByOrderIdResponse extends IResponse {
  body: IPayment;
}

export interface IFindPaymentByOrderIdController extends IController {
  handle(
    request: IFindPaymentByOrderIdRequest,
  ): Promise<IFindPaymentByOrderIdResponse>;
}

export class FindPaymentByOrderIdController
  implements IFindPaymentByOrderIdController
{
  constructor(private usecase: IFindPaymentByOrderIdUseCase) {}

  async handle({
    params,
  }: IFindPaymentByOrderIdRequest): Promise<IFindPaymentByOrderIdResponse> {
    try {
      const { id } = params;

      const payment = await this.usecase.execute(id);

      return HttpPresenter.success({ payment });
    } catch (error) {
      console.log('FindPaymentByOrderIdController', error);
      return HttpPresenter.badRequest(error);
    }
  }
}
