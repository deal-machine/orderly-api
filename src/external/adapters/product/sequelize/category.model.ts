import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { categoryNamesDto } from 'src/internal/domain/product/dto/category-name.dto';
import { ICategory } from 'src/internal/domain/product/entities/category.entity';

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
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare name: categoryNamesDto;

  @Column({
    field: 'description',
    allowNull: true,
    unique: false,
    type: DataType.STRING,
  })
  declare description: string;
}
