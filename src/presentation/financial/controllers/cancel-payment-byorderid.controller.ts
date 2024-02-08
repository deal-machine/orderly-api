import { IPayment } from 'src/domain/financial/entities/payment.entity';
import { ICancelPaymentByOrderIdUseCase } from 'src/domain/financial/usecases/cancel-payment-byorderid.usecase';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface ICancelPaymentByOrderIdRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface ICancelPaymentByOrderIdResponse extends IResponse {
  body: IPayment;
}

export interface ICancelPaymentByOrderIdController extends IController {
  handle(
    request: ICancelPaymentByOrderIdRequest,
  ): Promise<ICancelPaymentByOrderIdResponse>;
}

export class CancelPaymentByOrderIdController
  implements ICancelPaymentByOrderIdController
{
  constructor(private usecase: ICancelPaymentByOrderIdUseCase) {}

  async handle({
    params,
  }: ICancelPaymentByOrderIdRequest): Promise<ICancelPaymentByOrderIdResponse> {
    try {
      const { id } = params;
      await this.usecase.execute(id);
      return HttpPresenter.success({});
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
