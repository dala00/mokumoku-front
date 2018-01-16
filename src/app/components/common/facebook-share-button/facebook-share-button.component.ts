import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-facebook-share-button',
  templateUrl: './facebook-share-button.component.html',
  styleUrls: ['./facebook-share-button.component.css']
})
export class FacebookShareButtonComponent implements OnInit {

  src: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const url = 'https://www.facebook.com/plugins/share_button.php?href='
      + encodeURIComponent(location.href)
      + '&layout=button_count&size=small&mobile_iframe=true&appId=151456328318780&width=95&height=20';
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
