import { Module } from '@nestjs/common';
import { PaymentService } from '../../infrastructure/modules/financial/api/payment.service';
import { PaymentController } from '../../infrastructure/modules/financial/api/payment.controller';
import { Uuid } from 'src/infrastructure/adapters/tokens/uuid/uuid';
import { PaymentSequelizeRepository } from '../../infrastructure/modules/financial/sequelize/payment-sequelize.repository';
import { PaymentMercadoPago } from 'src/infrastructure/adapters/integrations/payment/payment-mercadopago';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishPaymentIntegrationListener } from '../../infrastructure/modules/financial/event-emitter/publish-order-request.listener';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentModel } from '../../infrastructure/modules/financial/sequelize/payment-model';
import { PaymentConsumeOrder } from '../../infrastructure/modules/financial/bullmq/order.consumer';
import { AxiosHttp } from 'src/infrastructure/adapters/http/axios';
import QueueModule from 'src/infrastructure/adapters/queue';
import { ChangePaymentStatusListener } from '../../infrastructure/modules/financial/event-emitter/change-payment-status.listener';
import { CreatePaymentUseCase } from 'src/application/usecases/financial/create-payment.usecase';
import { ApprovePaymentByOrderIdUseCase } from 'src/application/usecases/financial/approve-payment-byorderid.usecase';

@Module({
  imports: [SequelizeModule.forFeature([PaymentModel]), QueueModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
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
    CreatePaymentUseCase,
    { provide: 'CreatePaymentUseCase', useExisting: CreatePaymentUseCase },
    ApprovePaymentByOrderIdUseCase,
    {
      provide: 'ApprovePaymentByOrderIdUseCase',
      useExisting: ApprovePaymentByOrderIdUseCase,
    },
  ],
})
export class PaymentModule {}
