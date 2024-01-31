import { Module } from '@nestjs/common';
import { PaymentController } from '../../infrastructure/modules/financial/api/payment.controller';
import { Uuid } from 'src/infrastructure/drivers/tokens/uuid/uuid';
import { PaymentSequelizeRepository } from '../../infrastructure/modules/financial/sequelize/payment-sequelize.repository';
import { PaymentMercadoPago } from 'src/infrastructure/drivers/integrations/payment/payment-mercadopago';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishPaymentIntegrationListener } from '../../infrastructure/modules/financial/event-emitter/publish-order-request.listener';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentModel } from '../../infrastructure/modules/financial/sequelize/payment-model';
import { PaymentConsumeOrder } from '../../infrastructure/modules/financial/bullmq/order.consumer';
import { AxiosHttp } from 'src/infrastructure/drivers/http/axios';
import QueueModule from 'src/infrastructure/drivers/queue';
import { ChangePaymentStatusListener } from '../../infrastructure/modules/financial/event-emitter/change-payment-status.listener';
import {
  CreatePaymentUseCase,
  ApprovePaymentByOrderIdUseCase,
  CancelPaymentByOrderIdUseCase,
  FindPaymentByOrderId,
} from 'src/application/usecases/financial';

@Module({
  imports: [SequelizeModule.forFeature([PaymentModel]), QueueModule],
  controllers: [PaymentController],
  providers: [
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    PaymentSequelizeRepository,
    { provide: 'PaymentRepository', useExisting: PaymentSequelizeRepository },
    AxiosHttp,
    { provide: 'Http', useExisting: AxiosHttp },
    PaymentMercadoPago,
    { provide: 'PaymentIntegration', useExisting: PaymentMercadoPago },
    { provide: 'EventEmitter', useExisting: EventEmitter2 },
    PublishPaymentIntegrationListener,
    ChangePaymentStatusListener,
    PaymentConsumeOrder,

    // use cases
    CreatePaymentUseCase,
    ApprovePaymentByOrderIdUseCase,
    CancelPaymentByOrderIdUseCase,
    FindPaymentByOrderId,
    { provide: 'CreatePaymentUseCase', useExisting: CreatePaymentUseCase },
    {
      provide: 'ApprovePaymentByOrderIdUseCase',
      useExisting: ApprovePaymentByOrderIdUseCase,
    },
    {
      provide: 'CancelPaymentByOrderIdUseCase',
      useExisting: CancelPaymentByOrderIdUseCase,
    },
    { provide: 'FindPaymentByOrderId', useExisting: FindPaymentByOrderId },
  ],
})
export class PaymentModule {}
