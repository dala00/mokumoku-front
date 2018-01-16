import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { MeetingService } from '../../../services/meeting.service';
import { Meeting } from '../../../models/meeting';

@Component({
  selector: 'app-meeting-search',
  templateUrl: './meeting-search.component.html',
  styleUrls: ['./meeting-search.component.css']
})
export class MeetingSearchComponent implements OnInit {

  title = '一覧';
  meetings: Meeting[];
  savedRouteParams: any;
  endOfPage: boolean;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.savedRouteParams = Object.assign({}, params);
      this.savedRouteParams['page'] = 1;
      this.meetingService.find(this.savedRouteParams)
        .subscribe((res: Response) => {
          const data = res.json();
          this.meetings = data.meetings as Meeting[];
          this.endOfPage = data['endOfPage'];

          if (data['tag']) {
            this.title = `「${data['tag'].name}」の一覧`;
          } else if (data['user']) {
            this.title = `${data['user'].name} の開催一覧`;
          } else if (params['keyword']) {
            this.title = `「${params['keyword']}」の検索結果`;
          }
        });
    });
  }

  onScrollDown() {
    if (this.endOfPage || this.loading) {
      return;
    }
    this.loading = true;
    this.savedRouteParams['page']++;
    this.meetingService.find(this.savedRouteParams)
      .subscribe((res: Response) => {
        const json = res.json();
        const meetings = json.meetings as Meeting[];
        this.meetings = this.meetings.concat(meetings);
        this.endOfPage = json.endOfPage;
        this.loading = false;
      });
  }
}
