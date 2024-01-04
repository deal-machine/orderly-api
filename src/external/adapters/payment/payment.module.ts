import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Uuid } from 'src/external/infra/tokens/uuid/uuid';
import { PaymentConsumer } from './bullmq/consumers/payment.consumer';
import { PaymentSequelizeRepository } from './sequelize/payment-sequelize.repository';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentConsumer,
    Uuid,
    { provide: 'IdGenerator', useExisting: Uuid },
    PaymentSequelizeRepository,
    { provide: 'PaymentRepository', useExisting: PaymentSequelizeRepository },
  ],
})
export class PaymentModule {}

/** modulo payment
  criar acl de integrador de pagamentos
  criar webhook
  criar pagamento
  + consumir fila criação de ordem 
  - integração com mercado pago criando pagamento
  - produzir mensagem na fila de pagamentos gerados
  realizar pagamento
  - realizar pagamento
  - receber pagamento e confirmar com mercado pago
  - obter dados do pagamento
  obter dados do pagamento
  - consumir fila de pagamentos confirmados 
*/

/** modulo checkout
  consumir fila de dados de pagamento
  verificar pagamento ao permitir preparação do pedido
 */
