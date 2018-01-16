import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../../services/meeting.service';
import { Meeting } from '../../../models/meeting';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private meetings: Meeting[];

  constructor(
    private meetingService: MeetingService
  ) { }

  ngOnInit() {
    this.meetingService.find()
      .map(res => res.json().meetings)
      .subscribe(
        meetings => this.meetings = meetings
      )
  }

}
