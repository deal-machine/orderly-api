import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { IHttp } from 'src/application/ports/http/http';
import { CustomerCreatedEvent } from 'src/domain/checkin/customers/events/customer-created.event';

@Injectable()
export class CreateCustomerListener {
  constructor(
    @Inject('CustomerHttp')
    private customerHttp: IHttp,
  ) {}

  @OnEvent('customer.created')
  async handle(event: CustomerCreatedEvent) {
    this.customerHttp.post({ body: { customer: event.customer } });
  }
}
