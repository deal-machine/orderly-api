import { ICustomer } from 'src/domain/checkin/customers/entities/customer.entity';
import { IFindCustomerByCpfUseCase } from 'src/domain/checkin/customers/usecases/find-customer-bycpf.usecase';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IFindCustomerByCpfRequest extends IRequest {
  params: {
    cpf: string;
  };
}
export interface IFindCustomerByCpfResponse extends IResponse {
  body: ICustomer;
}
export interface IFindCustomerByCpfController extends IController {
  handle(
    request: IFindCustomerByCpfRequest,
  ): Promise<IFindCustomerByCpfResponse>;
}

export class FindCustomerByCpfController
  implements IFindCustomerByCpfController
{
  constructor(
    private readonly findCustomerByCpfUseCase: IFindCustomerByCpfUseCase,
  ) {}

  async handle({
    params,
  }: IFindCustomerByCpfRequest): Promise<IFindCustomerByCpfResponse> {
    try {
      const { cpf } = params;
      const customer = await this.findCustomerByCpfUseCase.execute(cpf);
      return HttpPresenter.success({ customer });
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
