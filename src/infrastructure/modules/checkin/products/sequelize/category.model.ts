import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ProductModel } from './product.model';
import { ICategory } from 'src/domain/checkin/products/entities/category.entity';
import { categoryNamesDto } from 'src/domain/checkin/products/dto/category-name.dto';

export interface ICategoryModel extends ICategory {}

@Table({
  tableName: 'categories',
  timestamps: false,
})
export class CategoryModel extends Model implements ICategoryModel {
  @Column({
    field: 'id',
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare id: string;

  @Column({
    field: 'name',
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare name: categoryNamesDto;

  @HasMany(() => ProductModel)
  declare products: ProductModel[];

  @Column({
    field: 'description',
    allowNull: true,
    unique: false,
    type: DataType.STRING,
  })
  declare description: string;
}
