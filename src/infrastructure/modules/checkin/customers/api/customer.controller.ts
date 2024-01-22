import { Controller, Post, Body, Inject, Get, Param } from '@nestjs/common';
import { CreateCustomerDto } from 'src/domain/checkin/customers/dto/create-customer.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';
import { ICreateCustomerUseCase } from 'src/domain/checkin/customers/usecases/create-customer.usecase';
import { IFindCustomerByCpf } from 'src/domain/checkin/customers/usecases/find-customer-bycpf.usecase';

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject('CreateCustomerUseCase')
    private createCustomerUseCase: ICreateCustomerUseCase,
    @Inject('FindCustomerByCpf')
    private findCustomerByCpf: IFindCustomerByCpf,
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.createCustomerUseCase.execute(createCustomerDto);
    } catch (err: any) {
      responseError(err);
    }
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
