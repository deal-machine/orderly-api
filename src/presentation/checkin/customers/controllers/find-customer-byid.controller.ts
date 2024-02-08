import { ICustomer } from 'src/domain/checkin/customers/entities/customer.entity';
import { IFindCustomerByIdUseCase } from 'src/domain/checkin/customers/usecases/find-customer-byid.usecase';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IFindCustomerByIdRequest extends IRequest {
  params: {
    id: string;
  };
}
export interface IFindCustomerByIdResponse extends IResponse {
  body: {
    customer: ICustomer;
  };
}
export interface IFindCustomerByIdController extends IController {
  handle(request: IFindCustomerByIdRequest): Promise<IFindCustomerByIdResponse>;
}

export class FindCustomerByIdController implements IFindCustomerByIdController {
  constructor(
    private readonly findCustomerByIdUseCase: IFindCustomerByIdUseCase,
  ) {}

  async handle({
    params,
  }: IFindCustomerByIdRequest): Promise<IFindCustomerByIdResponse> {
    try {
      const { id } = params;
      const customer = await this.findCustomerByIdUseCase.execute(id);
      return HttpPresenter.success({ customer });
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
