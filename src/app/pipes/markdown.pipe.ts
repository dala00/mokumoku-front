import { Pipe, PipeTransform } from '@angular/core';
const marked = require('marked');

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let tag = '<div class="markdown-body">';
    tag += marked(value);
    tag += '</div>';
    return tag;
  }

}
