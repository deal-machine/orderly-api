import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/**
  // * request GET /payments/order/:orderId -> returns paymentType (QRCODE)
  // @Get('payments/order/:orderId')
  // getPayment(@Param('orderId') orderId: string) {
  //   return this.ordersService.findAll();
  // }

  // * request POST /payments/order/:orderId -> confirm payment -> orderId
  // @Post('payments/order/:orderId')
  // payment(@Param('orderId') orderId: string) {
  //   // return this.ordersService.create(createOrderDto);
  // }

* ************ PAYMENT ************
  * request GET /payments/order/:orderId -> returns payment with paymentType (QRCODE)
  * request POST /payments/:id -> confirm payment
  * event -> send payment to a queue
  
  * verify product quantity
  * event -> product is decremented in database - podendo haver erro de quantidade

*/

type payment = {
  id: string;
  orderId: string;
  customerId: string;
  value: number;
  paymentType: string;
  qrCode: string;
  createdAt: Date;
  updatedAt: Date;
};

/**
 **** Requisitos técnicos ***
 * registro das entidades de dominio
 * criação dos casos de uso:
 *    - services (regras de negócio)
 *    - eventos (events e consumers)
 *    - banco de dados (repositories)
 
 * setup das configs no projeto (env)
 * setup banco de dados com sequelize
 * setup swagger
 * setup validations
 */
