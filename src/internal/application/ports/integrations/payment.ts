export interface IPaymentIntegration<T> {
  init(): T;
  payment(instance: T): any;
  createRequest(params: any): Promise<any>;
}
