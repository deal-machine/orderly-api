import { Module } from '@nestjs/common';
import { CustomerRouter } from './routes/customer.router';

@Module({
  imports: [],
  controllers: [CustomerRouter],
})
export class CustomerModule {}
