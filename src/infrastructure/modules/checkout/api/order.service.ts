import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import EventEmitter from 'events';
import { DomainException } from 'src/domain/@shared/errors';
import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { CreateOrderDto } from 'src/domain/checkout/dto/create-order.dto';

import { OrderItem } from 'src/domain/checkout/entities/order-item.entity';
import { Order } from 'src/domain/checkout/entities/order.entity';
import { CreatedOrderEvent } from 'src/domain/checkout/events/order-created.event';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import { IPayment } from 'src/domain/financial/entities/payment.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @Inject('EventEmitter')
    private eventEmitter: EventEmitter,

    @Inject('IdGenerator')
    private idGenerator: IIdentifierGenerator,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const products = createOrderDto.products;

    const orderItems = products.map((product) => {
      return new OrderItem({
        id: this.idGenerator.generate(),
        productId: product.id,
        quantity: product.quantity,
        value: product.price,
      });
    });
    const order = new Order({
      customerId: createOrderDto.customerId,
      id: this.idGenerator.generate(),
      orderItems,
    });

    this.eventEmitter.emit('order.created', new CreatedOrderEvent(order));

    return order;
  }

  async pay(payment: IPayment) {
    const order = await this.orderRepository.findOne(payment.orderId);
    if (!order) throw new NotFoundException('order not found');

    if (order.status !== 'Recebido')
      throw new DomainException('order status is invalid');

    if (payment.status !== 'Pendente de pagamento')
      throw new DomainException('payment must be done');

    this.eventEmitter.emit(
      'order-status.changed',
      new ChangedOrderStatusEvent({
        orderId: order.id,
        status: 'Pendente de pagamento',
      }),
    );
  }

  async prepare(orderId: string) {
    const order = await this.orderRepository.findOne(orderId);
    if (!order) throw new NotFoundException('order not found');

    if (order.status !== 'Pago')
      throw new DomainException('order status is invalid');

    this.eventEmitter.emit(
      'order-status.changed',
      new ChangedOrderStatusEvent({ orderId, status: 'Em preparação' }),
    );

    console.log('Preparing...');
    setTimeout(() => {
      this.eventEmitter.emit(
        'order-status.changed',
        new ChangedOrderStatusEvent({ orderId, status: 'Pronto' }),
      );
    }, 20000);
  }

  async withdrawn(orderId: string) {
    const order = await this.orderRepository.findOne(orderId);
    if (!order) throw new NotFoundException('order not found');

    if (order.status !== 'Pronto')
      throw new DomainException('order status is invalid');

    this.eventEmitter.emit(
      'order-status.changed',
      new ChangedOrderStatusEvent({ orderId, status: 'Finalizado' }),
    );
  }

  async findAll(customerId?: string, status?: string) {
    return this.orderRepository.findAll(customerId, status);
  }

  async getStatus(id: string) {
    const { status } = await this.orderRepository.getStatus(id);

    let timeToWait = 'Pedido ainda não foi iniciado.';

    if (status === 'Pago') timeToWait = 'Tempo de espera: 45 minutos.';

    if (status === 'Em preparação') timeToWait = 'Tempo de espera: 30 minutos.';

    if (status === 'Pronto') timeToWait = 'Pedido pronto para retirar.';

    if (status === 'Finalizado')
      timeToWait = 'Pedido foi retirado e finalizado.';

    return {
      status,
      timeToWait,
    };
  }

  async getCustomerReport(customerId: string) {
    return await this.orderRepository.getReportByCustomer(customerId);
  }
}
