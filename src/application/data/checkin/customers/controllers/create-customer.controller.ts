import { HttpPresenter } from 'src/application/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/domain/@shared/protocols/controller';
import { ICreateCustomerUseCase } from 'src/domain/checkin/customers/usecases/create-customer.usecase';

export class CreateCustomerController implements IController {
  constructor(private readonly createCustomerUseCase: ICreateCustomerUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { cpf, email, name } = body;
      const customer = await this.createCustomerUseCase.execute({
        cpf,
        email,
        name,
      });
      return HttpPresenter.success(customer);
    } catch (error) {
      return HttpPresenter.serverError();
    }
  }
}
