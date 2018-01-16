import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { MeetingService } from '../../../services/meeting.service';
import { MeetingPost } from '../../../models/meeting-post';

@Component({
  selector: 'app-meeting-post-edit',
  templateUrl: './meeting-post-edit.component.html',
  styleUrls: ['./meeting-post-edit.component.css']
})
export class MeetingPostEditComponent implements OnInit {

  meetingPost: MeetingPost;

  constructor(
    private meetingService: MeetingService,
    private snackBar: MdSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.meetingService.getEditPost(params['id']))
      .subscribe((meetingPost: MeetingPost) => this.meetingPost = meetingPost);
  }

  onSubmit() {
    this.meetingService.editPost(this.meetingPost)
      .subscribe((meetingPost: MeetingPost) => {
        this.router.navigate(['/meeting', this.meetingPost.meeting.id]);
        this.snackBar.open('更新しました。', '確認', {duration:5000});
      });
  }

}
