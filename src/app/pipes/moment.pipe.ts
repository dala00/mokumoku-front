import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: any, format?: string): any {
    if (!format) {
      format = 'dateTime';
    }
    if (format == 'date') {
      format = 'YYYY/M/D';
    } else if (format == 'time') {
      format = 'HH:mm:ss';
    } else if (format == 'dateTime') {
      format = 'YYYY/M/D HH:mm:ss';
    }
    return moment(value).format(format);
  }

}
