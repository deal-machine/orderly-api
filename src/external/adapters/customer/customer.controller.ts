import { Controller, Post, Body } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from 'src/internal/domain/customers/dto/create-customer.dto';

@Controller('checkin')
export class CustomerController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('customers')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }
}
