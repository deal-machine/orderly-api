import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';
import { IOrder } from 'src/domain/checkout/entities/order.entity';
import { ICreateOrderUseCase } from 'src/domain/checkout/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IRequest,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface ICreateOrderRequest extends IRequest {
  body: CreateOrderDto;
}
export interface ICreateOrderResponse extends IResponse {
  body: IOrder;
}
export interface ICreateOrderController extends IController {
  handle(request: ICreateOrderRequest): Promise<ICreateOrderResponse>;
}

export class CreateOrderController implements ICreateOrderController {
  constructor(private createOrderUseCase: ICreateOrderUseCase) {}

  async handle({ body }: ICreateOrderRequest): Promise<ICreateOrderResponse> {
    try {
      const { customerId, products } = body;
      const order = await this.createOrderUseCase.execute({
        customerId,
        products,
      });
      return HttpPresenter.success({ order });
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
