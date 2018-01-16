import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Page } from '../../models/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  page: Page;

  constructor(
    private route: ActivatedRoute,
    private http: HttpService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.http.get(`api/pages/view/${params['id']}`))
      .map((res: Response) => res.json().page)
      .subscribe(page => this.page = page);
  }

}
