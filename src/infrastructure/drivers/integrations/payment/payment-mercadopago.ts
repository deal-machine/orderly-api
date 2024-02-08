import { env } from 'src/application/configs/env';
import {
  IPaymentIntegration,
  IPaymentResult,
} from 'src/application/ports/integrations/payment';
import { IIdentifierGenerator } from 'src/application/ports/tokens/id-generator';
import { IHttp } from 'src/application/ports/http/http';
import { IPayment } from 'src/domain/financial/entities/payment.entity';

interface IRefreshToken {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
  userId: number;
  refreshToken: string;
  publicKey: string;
}

export class PaymentMercadoPago implements IPaymentIntegration {
  private baseUrl: string;
  private clientSecret: string;
  private grantType: string;
  private refreshTokenDefault: string;

  constructor(
    private readonly httpClient: IHttp,
    private readonly idGenerator: IIdentifierGenerator,
  ) {
    this.baseUrl = env.paymentIntegrationUrl;
    this.clientSecret = env.paymentIntegrationClientSecret;
    this.grantType = env.paymentIntegrationGrantType;
    this.refreshTokenDefault = env.paymentIntegrationRefreshToken;
  }

  private async refreshToken(): Promise<IRefreshToken> {
    const requestData = {
      url: `${this.baseUrl}/oauth/token`,
      body: {
        client_secret: this.clientSecret,
        grant_type: this.grantType,
        refresh_token: this.refreshTokenDefault,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { body } = await this.httpClient.post(requestData);

    return {
      accessToken: body.access_token,
      tokenType: body.token_type,
      expiresIn: body.expires_in,
      scope: body.scope,
      userId: body.user_id,
      refreshToken: body.refresh_token,
      publicKey: body.public_key,
    } as IRefreshToken;
  }

  private formatPaymentResult(body: any): IPaymentResult {
    return {
      id: body?.id ?? this.idGenerator.generate(),
      status: body?.status ?? 'fail',
      qrCode: body?.point_of_interaction?.transaction_data?.qr_code ?? '',
      url: body?.point_of_interaction?.transaction_data?.ticket_url ?? '',
    };
  }

  async updatePayment(
    payment: IPayment,
    status: string,
  ): Promise<IPaymentResult> {
    const { accessToken } = await this.refreshToken();

    const { body } = await this.httpClient.put({
      url: `${this.baseUrl}/v1/payments/${payment.id}`,
      body: {
        transaction_amount: payment.value,
        status,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Idempotency-Key': `12345`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return this.formatPaymentResult(body);
  }

  async getPayment(paymentId: string): Promise<IPaymentResult> {
    const { accessToken } = await this.refreshToken();

    const { body } = await this.httpClient.get({
      url: `${this.baseUrl}/v1/payments/${Number(paymentId)}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return this.formatPaymentResult(body);
  }

  async createPayment(payment: IPayment): Promise<IPaymentResult> {
    const { accessToken } = await this.refreshToken();

    const { body } = await this.httpClient.post({
      url: `${this.baseUrl}/v1/payments`,
      body: {
        transaction_amount: payment.value,
        payment_method_id: payment.paymentType,
        payer: { email: 'customer@customer.com' },
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Idempotency-Key': `12345`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return this.formatPaymentResult(body);
  }
  /* https://auth.mercadopago.com/authorization?client_id=APP_ID&response_type=code&platform_id=mp&state=RANDOM_ID&redirect_uri=YOUR_REDIRECT_URI/** 
    webhook  https://webhook.site/#!/17bc7308-87bc-47e6-9074-a75344af88d1/4611a0ca-67d6-4749-9696-4bdd31b14bbd/1
  */
}
