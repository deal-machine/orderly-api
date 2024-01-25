import { ServerError } from 'src/application/errors/server.error';
import { IResponse } from 'src/domain/@shared/protocols/controller';

export const badRequest = (error: Error): IResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): IResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const success = (data: any): IResponse => ({
  statusCode: 200,
  body: data,
});
