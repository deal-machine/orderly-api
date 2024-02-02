import { IPayment } from 'src/domain/financial/entities/payment.entity';
import { IApprovePaymentByOrderIdUseCase } from 'src/domain/financial/usecases/approve-payment-byorderid.usecase';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IApprovePaymentByOrderIdRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IApprovePaymentByOrderIdResponse extends IResponse {
  body: IPayment;
}

export interface IApprovePaymentByOrderIdController extends IController {
  handle(
    request: IApprovePaymentByOrderIdRequest,
  ): Promise<IApprovePaymentByOrderIdResponse>;
}

export class ApprovePaymentByOrderIdController
  implements IApprovePaymentByOrderIdController
{
  constructor(private usecase: IApprovePaymentByOrderIdUseCase) {}

  async handle({
    params,
  }: IApprovePaymentByOrderIdRequest): Promise<IApprovePaymentByOrderIdResponse> {
    try {
      const { id } = params;

      await this.usecase.execute(id);

      return HttpPresenter.success({});
    } catch (error) {
      console.log('ApprovePaymentByOrderIdController', error);
      return HttpPresenter.badRequest(error);
    }
  }
}
