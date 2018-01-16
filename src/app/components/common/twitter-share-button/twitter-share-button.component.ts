import { Component, OnInit, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-twitter-share-button',
  templateUrl: './twitter-share-button.component.html',
  styleUrls: ['./twitter-share-button.component.css']
})
export class TwitterShareButtonComponent implements OnInit {

  url: string;
  currentTitle: string;

  constructor(
    private titleService: Title,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.url = location.href;
    this.currentTitle = this.titleService.getTitle();
  }

  ngAfterViewInit() {
    let s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://platform.twitter.com/widgets.js';
    this.elementRef.nativeElement.appendChild(s);
  }
}
