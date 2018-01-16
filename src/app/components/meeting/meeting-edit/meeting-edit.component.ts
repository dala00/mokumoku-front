import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { MeetingService } from '../../../services/meeting.service';
import { Meeting } from '../../../models/meeting';

@Component({
  selector: 'app-meeting-edit',
  templateUrl: './meeting-edit.component.html',
  styleUrls: ['./meeting-edit.component.css'],
  providers: [MdSnackBar],
})
export class MeetingEditComponent implements OnInit {

  meeting: Meeting;

  constructor(
    private meetingService: MeetingService,
    private snackBar: MdSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.meetingService.getEdit(params['id']))
      .subscribe((meeting: Meeting) => this.meeting = meeting);
  }

  onSubmit(meeting: Meeting) {
    this.meetingService.edit(meeting)
      .subscribe((meeting: Meeting) => {
        this.router.navigate(['/meeting', meeting.id]);
        this.snackBar.open('更新しました。', '確認', {duration:5000});
      });
  }
}
