import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';
import { MeetingService } from '../../../services/meeting.service';
import { DataService } from '../../../services/data.service';
import { ConfirmService } from '../../../services/confirm.service';
import { SeoService } from '../../../services/seo.service';
import { HighlightService } from '../../../services/highlight.service';
import { Meeting } from '../../../models/meeting';
import { MeetingPost } from '../../../models/meeting-post';
import { MeetingComment } from '../../../models/meeting-comment';
import { User } from '../../../models/user';
const marked = require('marked');

@Component({
  selector: 'app-meeting-detail',
  templateUrl: './meeting-detail.component.html',
  styleUrls: ['./meeting-detail.component.css'],
  providers: [MdSnackBar]
})
export class MeetingDetailComponent implements OnInit {

  private meeting: Meeting;
  private meetingPost: MeetingPost;
  private meetingComment: MeetingComment;
  private user: User;
  private isClose: boolean;
  compiledBody: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private data: DataService,
    private confirm: ConfirmService,
    private seo: SeoService,
    private highlight: HighlightService,
    private snackBar: MdSnackBar
  ) {
    this.meetingPost = new MeetingPost();
    this.meetingComment = new MeetingComment();
    this.isClose = false;
  }

  ngOnInit() {
    this.data.sync('user', user => this.user = user);
    this.route.params
      .switchMap((params: Params) => this.meetingService.get(params['id']))
      .subscribe((meeting: Meeting) => {
        this.meeting = meeting;
        this.compiledBody = '<div class="markdown-body">' + marked(meeting.body) + '</div>';
        const description = this.generateDescription(this.compiledBody);
        this.seo.setMeta('description', description);
        this.seo.setMeta('og:description', description);
        this.data.set('title', meeting.name);
        this.highlight.initialize();
      });
  }

  generateDescription(body) {
    let result = body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
    result = result.replace(/[\r\n]/g, '');
    return result.substr(0, 124);
  }

  onMeetingPostSubmit() {
    const data = {close: this.isClose ? 1 : 0};
    this.meetingPost.meeting_id = this.meeting.id;
    this.meetingService.addPost(this.meetingPost, data)
      .subscribe((meeting: Meeting) => {
        if (meeting) {
          this.meeting = meeting;
          this.meetingPost = new MeetingPost();
        } else {
          this.snackBar.open('エラーが発生しました。', 'OK');
        }
      });
  }

  onMeetingCommentSubmit() {
    this.meetingComment.meeting_id = this.meeting.id;
    this.meetingService.addComment(this.meetingComment)
      .subscribe((meeting: Meeting) => {
        if (meeting) {
          this.meeting = meeting;
          this.meetingComment = new MeetingComment();
        } else {
          this.snackBar.open('エラーが発生しました。', 'OK');
        }
      });
  }

  setPrivate(isPrivate: boolean) {
    this.meeting.private = isPrivate;
    this.meetingService.edit(this.meeting)
      .subscribe(meeting => this.meeting = meeting);
  }

  setPostPrivate(meetingPostId: number, isPrivate: boolean) {
    const meetingPost = new MeetingPost(
      this.meeting.meeting_posts.filter((i) => i.id == meetingPostId)[0]
    );
    meetingPost.private = isPrivate;
    this.meetingService.editPost(meetingPost)
      .subscribe(meetingPost => {
        for (let i in this.meeting.meeting_posts) {
          if (this.meeting.meeting_posts[i].id == meetingPostId) {
            this.meeting.meeting_posts[i] = meetingPost;
            break;
          }
        }
      });
  }

  onDeleteClick() {
    this.confirm.open('削除してよろしいですか？')
      .filter(result => result == 'OK')
      .subscribe(this.deleteProc.bind(this));
  }

  deleteProc() {
    this.meetingService.delete(this.meeting.id)
      .subscribe(() => {
        this.router.navigate(['']);
        this.snackBar.open('削除しました。', 'OK');
      });
  }

  onPostDeleteClick(meetingPostId: number) {
    this.meetingService.deletePost(meetingPostId)
      .subscribe((meeting) => {
        this.snackBar.open('削除しました。', 'OK', {duration: 3000});
        this.meeting = meeting;
      });
  }

  onCommentDeleteClick(meetingCommentId: number) {
    this.meetingService.deleteComment(meetingCommentId)
      .subscribe((meeting) => {
        this.snackBar.open('削除しました。', 'OK', {duration: 3000});
        this.meeting = meeting;
      });
  }
}
