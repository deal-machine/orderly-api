import { GetOrderReportByCustomerIdUseCase } from 'src/application/usecases/checkout';
import { OrderSequelizeRepository } from 'src/infrastructure/drivers/database/repositories/order-sequelize.repository';
import {
  GetReportByCustomerIdController,
  IGetReportByCustomerIdController,
} from 'src/presentation/checkout/controllers/get-report-bycustomerid.controller';

export class GetReportByCustomerIdFactory {
  static register(): IGetReportByCustomerIdController {
    const orderRepository = new OrderSequelizeRepository();

    const getReportByCustomerIdUseCase = new GetOrderReportByCustomerIdUseCase(
      orderRepository,
    );

    return new GetReportByCustomerIdController(getReportByCustomerIdUseCase);
  }
}
