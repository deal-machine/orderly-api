import { Module } from '@nestjs/common';
import { ProductRouter } from './routes/product.router';

@Module({
  imports: [],
  controllers: [ProductRouter],
  providers: [],
})
export class ProductModule {}
