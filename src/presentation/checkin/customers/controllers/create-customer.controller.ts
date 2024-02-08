import { ICreateCustomerUseCase } from 'src/domain/checkin/customers/usecases/create-customer.usecase';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';
import { HttpPresenter } from '../presenters/http.presenter';
import { CreateCustomerDto } from 'src/domain/checkin/customers/dto/create-customer.dto';
import { ICustomer } from 'src/domain/checkin/customers/entities/customer.entity';

export interface ICreateCustomerRequest extends IRequest {
  body: CreateCustomerDto;
}
export interface ICreateCustomerResponse extends IResponse {
  body: ICustomer;
}
export interface ICreateCustomerController extends IController {
  handle(request: ICreateCustomerRequest): Promise<ICreateCustomerResponse>;
}

export class CreateCustomerController implements ICreateCustomerController {
  constructor(private readonly createCustomerUseCase: ICreateCustomerUseCase) {}

  async handle({
    body,
  }: ICreateCustomerRequest): Promise<ICreateCustomerResponse> {
    try {
      const { cpf, email, name } = body;
      const customer = await this.createCustomerUseCase.execute({
        cpf,
        email,
        name,
      });
      return HttpPresenter.success({ customer });
    } catch (error) {
      return HttpPresenter.serverError();
    }
  }
}
