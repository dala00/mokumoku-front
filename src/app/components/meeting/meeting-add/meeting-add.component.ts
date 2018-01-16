import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MeetingService } from '../../../services/meeting.service';
import { HttpService } from '../../../services/http.service';
import { Meeting } from '../../../models/meeting';

@Component({
  selector: 'app-meeting-add',
  templateUrl: './meeting-add.component.html',
  styleUrls: ['./meeting-add.component.css'],
  providers: [MdSnackBar],
})
export class MeetingAddComponent implements OnInit {

  private meeting: Meeting;

  constructor(
    private meetingService: MeetingService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.meetingService.addDraft()
      .subscribe((meeting: Meeting) => this.meeting = meeting);
  }

  onSubmit(meeting: Meeting) {
    this.meetingService.add(meeting)
      .subscribe((meeting: Meeting) => {
        if (meeting.id) {
          this.router.navigate(['/meeting', meeting.id]);
          this.snackBar.open('登録しました。', '確認', {duration:5000});
        } else {
          this.snackBar.open('エラーが発生しました。', '確認', {duration:5000});
        }
      });
  }
}
