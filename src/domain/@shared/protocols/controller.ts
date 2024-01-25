export interface IResponse {
  statusCode: number;
  body: any;
}
export interface IRequest {
  body?: any;
  params?: any;
  headers?: any;
  query?: any;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
