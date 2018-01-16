import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nofollow'
})
export class NofollowPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    const links = value.match(/<a [^>]+>/gi);
    if (links) {
      links.forEach((tag) => {
        const href = tag.match(/href="([^"]*)"/);
        const myUrl = location.protocol + '//' + location.host;
        if (href && href[1].match(/^http/) && href[1].indexOf(myUrl) == -1) {
          const newTag = tag.replace(/^<a/i, '<a rel="nofollow" target="_blank"');
          value = value.replace(tag, newTag);
        }
      });
    }
    return value;
  }

}
