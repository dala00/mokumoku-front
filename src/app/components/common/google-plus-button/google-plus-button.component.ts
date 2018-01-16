import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-plus-button',
  templateUrl: './google-plus-button.component.html',
  styleUrls: ['./google-plus-button.component.css']
})
export class GooglePlusButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if (window['gapi'] && window['gapi'].plusone) {
      window['gapi'].plusone.render("widget-div");
    }
  }

}
