import { ServerError } from '../errors/server.error';
import { IResponse } from '../protocols/controller';

export class HttpPresenter {
  static readonly badRequest = (error: Error): IResponse => ({
    statusCode: 400,
    body: error,
  });

  static readonly serverError = (): IResponse => ({
    statusCode: 500,
    body: new ServerError(),
  });

  static readonly success = (data: any): IResponse => ({
    statusCode: 200,
    body: data,
  });
}
