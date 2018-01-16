import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../../../services/http.service';
import { Meeting } from '../../../models/meeting';

@Component({
  selector: 'app-mystars',
  templateUrl: './mystars.component.html',
  styleUrls: ['./mystars.component.css']
})
export class MystarsComponent implements OnInit {

  page = 0;
  meetings: Meeting[];
  endOfPage = false;
  loading = false;

  constructor(
    private http: HttpService
  ) { }

  ngOnInit() {
    this.meetings = [];
    this.onScrollDown();
  }

  onScrollDown() {
    if (this.endOfPage || this.loading) {
      return;
    }
    this.loading = true;
    this.http.get('api/stars/mine', {page: ++this.page})
      .catch(res => this.http.handleError)
      .subscribe((res: Response) => {
        const json = res.json();
        const meetings = json.meetings as Meeting[];
        this.meetings = this.meetings.concat(meetings);
        this.endOfPage = json.endOfPage;
        this.loading = false;
      });
  }
}
