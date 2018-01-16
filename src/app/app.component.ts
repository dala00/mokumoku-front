import { Component, OnInit, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';
import { SeoService } from './services/seo.service';
import { User } from './models/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = '一人もくもく会';
  description = '一人でもくもくした作業ログを残すサービスです。';
  user: User;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private http: HttpService,
    private data: DataService,
    private seo: SeoService
  ) {
    this.data.sync('user', user => this.user = user);
    this.data.sync('title', title => {
      if (title) {
        title += ' - ' + this.title;
      } else {
        title = this.title;
      }
      this.seo.setTitle(title);
    });
  }

  ngOnInit() {
    const tmp = this.router;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.data.set('title', null);
        this.seo.setMeta('description', this.description);
        this.seo.setMeta('og:description', this.description);
      }
    });

    if (this.document.location.href.indexOf('twitter-login-callback') === -1) {
      this.http.get('api/users/login-url')
        .subscribe((res: Response) => {
          const data = res.json();
          this.data.set(data);
        });
    }
  }
}
