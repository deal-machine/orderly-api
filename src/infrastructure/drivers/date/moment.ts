import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { IDateAdapter } from 'src/application/ports/date/date-adapter';

@Injectable()
export class MomentDateAdapter implements IDateAdapter {
  addMinutes(date: Date, minutes: number): string {
    return moment(date).add(minutes, 'minutes').calendar();
  }

  subtractDate(date: string): Date {
    const dateInMili = moment(date).get('milliseconds');
    return moment().subtract(dateInMili, 'milliseconds').toDate();
  }
}
