import { Controller, Post, Body, Inject } from '@nestjs/common';
import { CreateCustomerDto } from 'src/domain/checkin/customers/dto/create-customer.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';
import { ICreateCustomerUseCase } from 'src/domain/checkin/customers/usecases/create-customer.usecase';

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject('CreateCustomerUseCase')
    private createCustomerUseCase: ICreateCustomerUseCase,
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.createCustomerUseCase.execute(createCustomerDto);
    } catch (err: any) {
      responseError(err);
    }
  }
}
