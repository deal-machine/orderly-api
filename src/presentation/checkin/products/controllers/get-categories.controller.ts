import { ICategory } from 'src/domain/checkin/products/entities/category.entity';
import { IGetCategoriesUseCase } from 'src/domain/checkin/products/usecases';
import { HttpPresenter } from 'src/presentation/@shared/presenters/http.presenter';
import {
  IController,
  IResponse,
} from 'src/presentation/@shared/protocols/controller';

export interface IGetCategoriesResponse extends IResponse {
  body: ICategory[];
}
export interface IGetCategoriesController extends IController {
  handle(): Promise<IGetCategoriesResponse>;
}

export class GetCategoriesController implements IGetCategoriesController {
  constructor(private getCategoriesUseCase: IGetCategoriesUseCase) {}

  async handle(): Promise<IGetCategoriesResponse> {
    try {
      const categories = await this.getCategoriesUseCase.execute();
      return HttpPresenter.success({ categories });
    } catch (error) {
      return HttpPresenter.badRequest(error);
    }
  }
}
