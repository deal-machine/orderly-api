import { ServerError } from 'src/presentation/@shared/errors/server.error';
import { IResponse } from 'src/presentation/@shared/protocols/controller';

export class HttpPresenter {
  static badRequest = (error: Error): IResponse => ({
    statusCode: 400,
    body: error,
  });

  static serverError = (): IResponse => ({
    statusCode: 500,
    body: new ServerError(),
  });

  static success = (data: any): IResponse => ({
    statusCode: 200,
    body: data,
  });
}
