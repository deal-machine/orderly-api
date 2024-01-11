import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderItemModel } from './order-item-model';
import { CustomerModel } from '../../checkin/customer/sequelize/customer.model';

interface IOrderModel {
  id: string;
  total: number;
  customerId: string;
  status: string;
  orderItems: OrderItemModel[];
}

@Table({
  tableName: 'orders',
  timestamps: true,
})
class OrderModel extends Model implements IOrderModel {
  @Column({
    field: 'id',
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({
    field: 'customer_id',
    allowNull: false,
    type: DataType.STRING,
  })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare orderItems: OrderItemModel[];

  @Column({
    field: 'status',
    allowNull: false,
    type: DataType.STRING,
  })
  declare status: string;

  @Column({
    field: 'total',
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  declare total: number;
}

export { OrderModel };
