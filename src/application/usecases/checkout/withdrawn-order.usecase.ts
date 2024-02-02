import { NotFoundException } from 'src/application/errors';
import { IEventDispatcher } from 'src/application/ports/events';
import { DomainException } from 'src/domain/@shared/errors';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import { IWithdrawnOrderUseCase } from 'src/domain/checkout/usecases/withdrawn-order.usecase';

export class WithdrawnOrderUseCase implements IWithdrawnOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findOne(orderId);
    if (!order) throw new NotFoundException('order not found');

    if (order.status !== 'Pronto')
      throw new DomainException('order status is invalid');

    this.eventDispatcher.dispatch(
      new ChangedOrderStatusEvent({ orderId, status: 'Finalizado' }),
    );
  }
}
