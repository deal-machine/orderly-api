import { IEventHandler } from 'src/application/ports/events';
import { ChangedOrderStatusEvent } from 'src/domain/checkout/events/order-status-changed.event';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';

export class ChangeOrderStatusHandler implements IEventHandler {
  constructor(private orderRepository: IOrderRepository) {}

  async handle(event: ChangedOrderStatusEvent) {
    const { orderId, status } = event.data;
    if (status === 'Pronto') {
      console.log('Finished.');
    }
    await this.orderRepository.changeStatus(orderId, status);
  }
}
