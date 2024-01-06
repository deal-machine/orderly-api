import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { CustomerCreatedEvent } from '../../../../../internal/domain/customers/events/customer-created.event';
import { IHttp } from 'src/internal/application/ports/http/http';

@Processor('customers')
export class CustomerConsumer {
  constructor(
    @Inject('CustomerHttp')
    private customerHttp: IHttp,
  ) {}

  @Process('customer.created')
  async handle(job: Job<CustomerCreatedEvent>) {
    try {
      // send mail

      await this.customerHttp.post({
        body: { customer: job.data.customer },
      });
    } catch (err: any) {
      console.error(`CustomerConsumer ${err.message}`);
    }
  }
}
