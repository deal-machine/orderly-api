import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { Job } from 'bull';
import { IHttp } from 'src/application/ports/http/http';
import { CustomerCreatedEvent } from 'src/domain/checkin/customers/events/customer-created.event';

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
