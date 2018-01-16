import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';

class StarResult {
  active: boolean;
  count: number;
}

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {

  @Input() meeting_id: number;
  @Input() active: boolean = false;
  @Input() count: number = 0;
  @Input() showCount: boolean = false;
  user: User;

  constructor(
    private http: HttpService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.sync('user', user => this.user = user);
  }

  onClick() {
    const data = {
      meeting_id: this.meeting_id,
      active: this.active ? 0 : 1,
    };
    this.http.post('api/stars/toggle', data)
      .map(res => res.json() as StarResult)
      .catch(res => this.http.handleError(res))
      .subscribe((res: StarResult) => {
        this.active = res.active;
        this.count = res.count;
      });
  }
}
