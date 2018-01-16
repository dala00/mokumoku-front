import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: any, maxLength: number): any {
    if (value.length > maxLength) {
      value = value.substr(0, maxLength) + '...';
    }
    return value;
  }

}
