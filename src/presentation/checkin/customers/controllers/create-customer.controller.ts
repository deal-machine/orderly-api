import { ICreateCustomerUseCase } from 'src/domain/checkin/customers/usecases/create-customer.usecase';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';
import { HttpPresenter } from '../presenters/http.presenter';

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
      return HttpPresenter.success({ customer });
    } catch (error) {
      console.log(error);
      return HttpPresenter.serverError();
    }
  }
}
