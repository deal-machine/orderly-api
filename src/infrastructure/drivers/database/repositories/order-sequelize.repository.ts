import {
  IOrderRepository,
  ITotalReport,
} from 'src/domain/checkout/repositories/order.repository';
import { OrderItemModel } from '../models/order-item-model';
import { OrderModel } from '../models/order-model';
import { Order } from 'src/domain/checkout/entities/order.entity';
import { OrderItem } from 'src/domain/checkout/entities/order-item.entity';
import { orderStatusDto } from 'src/domain/checkout/dto/order-status.dto';

export class OrderSequelizeRepository implements IOrderRepository {
  async getStatus(id: string): Promise<{ status: string }> {
    const order = await OrderModel.findOne({ where: { id } });
    return {
      status: order.status,
    };
  }

  async getReportByCustomer(customerId: string): Promise<ITotalReport> {
    const purchases = await OrderModel.count({
      where: { customerId },
      col: 'id',
    });
    const total = await OrderModel.sum('total', { where: { customerId } });

    return {
      purchases: purchases ?? 0,
      value: total ?? 0,
    };
  }

  async changeStatus(orderId: string, status: string): Promise<void> {
    await OrderModel.update({ status }, { where: { id: orderId } });
  }

  async findOne(id: string): Promise<Order | null> {
    const orderModel = await OrderModel.findByPk(id, {
      include: [
        {
          model: OrderItemModel,
          as: 'orderItems',
        },
      ],
    });

    if (!orderModel) return null;

    const orderItems = orderModel.orderItems.map((item) => {
      return new OrderItem({
        id: item.id,
        value: Number(item.value),
        productId: item.productId,
        quantity: item.quantity,
      });
    });

    const order = new Order({
      id: orderModel.id,
      customerId: orderModel.customerId,
      orderItems,
    });
    order.updateStatus(orderModel.status as orderStatusDto);
    order.setUpdatedAt(orderModel.updatedAt);

    return order;
  }

  async findAll(
    customerIdQuery?: string,
    statusQuery?: string,
  ): Promise<Order[]> {
    const customerId = customerIdQuery ? { customerId: customerIdQuery } : {};
    const status = statusQuery ? { status: statusQuery } : {};
    const orderModels = await OrderModel.findAll({
      where: { ...customerId, ...status },
      include: [
        {
          model: OrderItemModel,
          as: 'orderItems',
        },
      ],
    });

    if (orderModels.length < 1) return [];

    return orderModels.map((om) => {
      const orderItems = om.orderItems.map((item) => {
        return new OrderItem({
          id: item.id,
          value: Number(item.value),
          productId: item.productId,
          quantity: item.quantity,
        });
      });
      const order = new Order({
        id: om.id,
        customerId: om.customerId,
        orderItems,
      });
      order.updateStatus(om.status as orderStatusDto);
      order.setUpdatedAt(om.updatedAt);

      return order;
    });
  }

  async create(entity: Order): Promise<void> {
    const orderModel = await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total,
      status: entity.status,
    });

    await Promise.all(
      entity.orderItems.map(async (item) => {
        return OrderItemModel.create({
          id: item.id,
          productId: item.productId,
          orderId: orderModel.id,
          value: Number(item.value),
          quantity: item.quantity,
        });
      }),
    );
  }

  async delete(id: string): Promise<void> {
    await OrderModel.destroy({ where: { id } });
  }

  async update(id: string, { customerId }: Partial<Order>): Promise<void> {
    await OrderModel.update({ customerId }, { where: { id } });
  }
}
