import { IProduct } from '../entities/product.entity';

export interface UpdateProductDto extends Omit<IProduct, 'id' | 'quantity'> {}
