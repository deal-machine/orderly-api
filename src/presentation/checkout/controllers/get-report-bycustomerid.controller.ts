import {
  IGetOrderReportByCustomerIdOutput,
  IGetOrderReportByCustomerIdUseCase,
} from 'src/domain/checkout/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IGetReportByCustomerIdRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IGetReportByCustomerIdResponse extends IResponse {
  body: IGetOrderReportByCustomerIdOutput;
}
export interface IGetReportByCustomerIdController extends IController {
  handle(
    request: IGetReportByCustomerIdRequest,
  ): Promise<IGetReportByCustomerIdResponse>;
}

export class GetReportByCustomerIdController
  implements IGetReportByCustomerIdController
{
  constructor(
    private getOrderReportByCustomerIdUseCase: IGetOrderReportByCustomerIdUseCase,
  ) {}

  async handle({
    params,
  }: IGetReportByCustomerIdRequest): Promise<IGetReportByCustomerIdResponse> {
    try {
      const { id } = params;
      const reports = await this.getOrderReportByCustomerIdUseCase.execute(id);
      return HttpPresenter.success(reports);
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
