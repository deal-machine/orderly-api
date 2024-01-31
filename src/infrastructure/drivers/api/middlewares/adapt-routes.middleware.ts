import { Request, Response, NextFunction } from 'express';
import { NestAdapter } from 'src/infrastructure/adapters/nest.adapter';

export function adaptRoutes(req: Request, _res: Response, next: NextFunction) {
  const requestAdapted = NestAdapter.adapt(req);
  req['data'] = requestAdapted;
  next();
}
