import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from 'src/domain/checkin/customers/dto/create-customer.dto';
import { responseError } from 'src/infrastructure/adapters/api/presenters/output/reponse.error';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      return await this.customersService.create(createCustomerDto);
    } catch (err: any) {
      responseError(err);
    }
  }
}
