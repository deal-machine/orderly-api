import { IFindCustomerByCpfUseCase } from 'src/domain/checkin/customers/usecases/find-customer-bycpf.usecase';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export class FindCustomerByCpfController implements IController {
  constructor(
    private readonly findCustomerByCpfUseCase: IFindCustomerByCpfUseCase,
  ) {}

  async handle({ params }: IRequest): Promise<IResponse> {
    try {
      const { cpf } = params;
      const customer = await this.findCustomerByCpfUseCase.execute(cpf);
      return HttpPresenter.success({ customer });
    } catch (error) {
      console.log(error);
      return HttpPresenter.badRequest(error);
    }
  }
}
