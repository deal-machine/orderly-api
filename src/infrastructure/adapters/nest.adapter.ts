import { Request } from 'express';
import { IRequest } from 'src/presentation/@shared/protocols/controller';

export class NestAdapter {
  static adapt(req: Request): IRequest {
    return {
      body: req.body,
      headers: req.headers,
      params: req.params,
      query: req.query,
    };
  }
}
