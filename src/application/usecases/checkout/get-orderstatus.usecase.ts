import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/domain/checkout/repositories/order.repository';
import {
  IGetOrderStatusOutput,
  IGetOrderStatusUseCase,
} from 'src/domain/checkout/usecases/get-orderstatus.usecase';

@Injectable()
export class GetOrderStatusUseCase implements IGetOrderStatusUseCase {
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(id: string): Promise<IGetOrderStatusOutput> {
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
}
