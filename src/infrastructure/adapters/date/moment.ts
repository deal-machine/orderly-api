import { Injectable } from '@nestjs/common';
import moment from 'moment';
import { IDateAdapter } from 'src/application/ports/date/date-adapter';

@Injectable()
export class MomentDateAdapter implements IDateAdapter {
  addMinutes(date: Date, minutes: number): string {
    return moment(date).add(minutes, 'minutes').calendar();
  }

  subtractDate(date: string): Date {
    console.log('here on moment date', date);
    const dateInMili = moment(date).get('milliseconds');
    console.log('here on moment milliseconds', dateInMili);
    return moment().subtract(dateInMili, 'milliseconds').toDate();
  }
}
