import { IPaymentIntegration } from 'src/internal/application/ports/integrations/payment';
import { MercadoPagoConfig, MerchantOrder } from 'mercadopago';

export class PaymentMercadoPago
  implements IPaymentIntegration<MercadoPagoConfig>
{
  init(): MercadoPagoConfig {
    return new MercadoPagoConfig({
      accessToken:
        'TEST-5835567092811299-010412-8acdfeb23a430130ac900221558ce327-152047844',
    });
  }

  payment(instance: MercadoPagoConfig) {
    const payment = new MerchantOrder(instance);
    payment.create({
      body: {
        application_id: '5835567092811299',
      },
    });
  }

  createRequest(params: any): Promise<any> {}
}
