import { Controller, Post, Inject, Get, Param, Req } from '@nestjs/common';
import { responseError } from 'src/infrastructure/drivers/api/presenters/output/reponse.error';
import { IFindCustomerByCpf } from 'src/domain/checkin/customers/usecases/find-customer-bycpf.usecase';
import { Request } from 'express';
import { NestAdapter } from 'src/infrastructure/adapters/nest.adapter';
import { CreateCustomerFactory } from 'src/main/factories/controllers/create-customer.factory';
import { IResponse } from 'src/presentation/@shared/protocols/controller';

@Controller('customers')
export class CustomerRouter {
  constructor(
    @Inject('FindCustomerByCpf')
    private findCustomerByCpf: IFindCustomerByCpf,
  ) {}

  @Post()
  async create(@Req() request: Request): Promise<IResponse> {
    const requestAdapted = NestAdapter.adapt(request);
    const controller = CreateCustomerFactory.register();
    return await controller.handle(requestAdapted);
  }

  @Get(':cpf')
  async getCustomer(@Param('cpf') cpf: string) {
    try {
      return await this.findCustomerByCpf.execute(cpf);
    } catch (err) {
      return responseError(err);
    }
  }
}
