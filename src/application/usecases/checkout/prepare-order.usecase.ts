import { NotFoundException } from 'src/application/errors';
import { IEventDispatcher } from 'src/application/ports/events';
import { DomainException } from 'src/domain/@shared/errors';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import { IPrepareOrderUseCase } from 'src/domain/checkout/usecases/prepare-order.usecase';

export class PrepareOrderUseCase implements IPrepareOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findOne(orderId);
    if (!order) throw new NotFoundException('order not found');

    if (order.status !== 'Pago')
      throw new DomainException('order status is invalid');

    this.eventDispatcher.dispatch(
      new ChangedOrderStatusEvent({ orderId, status: 'Em preparação' }),
    );

    console.log('Preparing...');
    setTimeout(() => {
      this.eventDispatcher.dispatch(
        new ChangedOrderStatusEvent({ orderId, status: 'Pronto' }),
      );
    }, 20000);
  }
}
