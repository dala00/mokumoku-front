import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paragraph'
})
export class ParagraphPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      value = value.replace(/\r\n/g, "\n");
      value = value.replace(/\n{2,}/g, '</p><p>');
    } else {
      value = '';
    }
    return `<p>${value}</p>`;
  }

}
