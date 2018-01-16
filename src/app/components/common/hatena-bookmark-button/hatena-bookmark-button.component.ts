import { Component, OnInit, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-hatena-bookmark-button',
  templateUrl: './hatena-bookmark-button.component.html',
  styleUrls: ['./hatena-bookmark-button.component.css']
})
export class HatenaBookmarkButtonComponent implements OnInit {

  url: string;
  currentTitle: string;

  constructor(
    private titleService: Title,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.url = location.href;
    this.currentTitle = this.titleService.getTitle();
  }

  ngAfterViewInit() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://b.st-hatena.com/js/bookmark_button.js';
    s.charset = 'utf-8';
    s.async = true;
    this.elementRef.nativeElement.appendChild(s);
  }
}
