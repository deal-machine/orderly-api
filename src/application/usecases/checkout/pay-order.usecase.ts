import { Inject, Injectable } from '@nestjs/common';
import { NotFoundException } from 'src/application/errors';
import { IEventEmitter } from 'src/application/ports/events/event-emitter';
import { DomainException } from 'src/domain/@shared/errors';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import { IPayOrderUseCase } from 'src/domain/checkout/usecases/pay-order.usecase';

@Injectable()
export class PayOrderUseCase implements IPayOrderUseCase {
  constructor(
    @Inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @Inject('EventEmitter')
    private eventEmitter: IEventEmitter,
  ) {}

  async execute(orderId: string) {
    const order = await this.orderRepository.findOne(orderId);
    if (!order) throw new NotFoundException('order not found');

    if (order.status !== 'Recebido')
      throw new DomainException('order status is invalid');

    this.eventEmitter.emit(
      'order-status.changed',
      new ChangedOrderStatusEvent({
        orderId: order.id,
        status: 'Pendente de pagamento',
      }),
    );
  }
}
