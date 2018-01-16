import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { Meeting } from '../models/meeting';
import { MeetingPost } from '../models/meeting-post';
import { MeetingComment } from '../models/meeting-comment';

@Injectable()
export class MeetingService {

  constructor(
    private httpService: HttpService
  ) { }

  find(search?: Object): any {
    return this.httpService.get('api/meetings', search)
      .catch(res => this.httpService.handleError(res));
  }

  get(id: number): Observable<Meeting> {
    return this.httpService.get('api/meetings/view/' + id)
      .map((res: Response) => new Meeting(res.json().meeting))
      .catch(res => this.httpService.handleError(res));
  }

  add(meeting: Meeting): Observable<Meeting> {
    const data: any = meeting.toObject();
    return this.httpService.post('api/meetings/add', data)
      .map((res: Response) => new Meeting(res.json().meeting))
      .catch(res => this.httpService.handleError(res));
  }

  addDraft(): Observable<Meeting> {
    return this.httpService.post('api/meetings/add-draft')
      .map((res: Response) => new Meeting(res.json().meeting))
      .catch(res => this.httpService.handleError(res));
  }

  getEdit(id: number): Observable<Meeting> {
    return this.httpService.get(`api/meetings/edit/${id}`)
      .map(res => new Meeting(res.json().meeting))
      .catch(res => this.httpService.handleError(res));
  }

  edit(meeting: Meeting): Observable<Meeting> {
    const data: any = meeting.toObject();
    return this.httpService.post(`api/meetings/post-edit/${meeting.id}`, data)
      .map(res => new Meeting(res.json().meeting))
      .catch(res => this.httpService.handleError(res));
  }

  getEditPost(id: number): Observable<MeetingPost> {
    return this.httpService.get(`api/meeting-posts/edit/${id}`)
      .map(res => new MeetingPost(res.json().meetingPost))
      .catch(res => this.httpService.handleError(res));
  }

  editPost(meetingPost: MeetingPost): Observable<MeetingPost> {
    const data: any = meetingPost.toObject();
    return this.httpService.post(`api/meeting-posts/post-edit/${meetingPost.id}`, data)
      .map(res => new MeetingPost(res.json().meetingPost))
      .catch(res => this.httpService.handleError(res));
  }

  addPost(meetingPost: MeetingPost, data?: any): Observable<Meeting> {
    const postData = {meetingPost, data};
    return this.httpService.post('api/meeting-posts/add', postData)
      .map((res: Response) => {
        const json = res.json();
        if (!json.result) {
          return null;
        }
        return json.meeting as Meeting;
      })
      .catch(res => this.httpService.handleError(res));
  }

  deletePost(meetingPostId: number): Observable<Meeting> {
    return this.httpService.post(`api/meeting-posts/delete/${meetingPostId}`)
      .map(res => new Meeting(res.json().meeting))
      .catch(res => this.httpService.handleError(res));
  }

  addComment(meetingComment: MeetingComment): Observable<Meeting> {
    return this.httpService.post('api/meeting-comments/add', meetingComment)
      .map(res => res.json().meeting as Meeting)
      .catch(res => this.httpService.handleError(res));
  }

  deleteComment(meetingCommentId: number): Observable<Meeting> {
    return this.httpService.post(`api/meeting-comments/delete/${meetingCommentId}`)
      .map(res => new Meeting(res.json().meeting))
      .catch(res => this.httpService.handleError(res));
  }

  private extractDataAll(res: Response) {
    return res.json().meetings;
  }

  delete(id: number): Observable<any> {
    return this.httpService.post(`api/meetings/delete/${id}`)
      .catch(res => this.httpService.handleError(res));
  }
}
