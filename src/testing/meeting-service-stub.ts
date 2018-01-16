import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MeetingServiceStub {

  private subject = new BehaviorSubject(this.meeting);
  private responseSubject = new BehaviorSubject(this.response);
  private _meeting: any = {};
  private _response: any = {};
  private id: number;

  get meeting() { return this._meeting }
  set meeting(meeting: any) {
    this._meeting = meeting;
    if (this.id) {
      this._meeting.id = this.id;
    }
    this.subject.next(this._meeting);
  }

  get response() { return this._response }
  set response(response: any) {
    this._response = response;
    this.responseSubject.next(this._response);
  }

  find() {
    return this.responseSubject.asObservable();
  }

  get(id: number) {
    return this.subject.asObservable();
  }

  getEdit(id: number) {
    this.id = id;
    return this.subject.asObservable();
  }

  getEditPost(id: number) {
    this.id = id;
    return this.subject.asObservable();
  }

  addDraft() {
    return this.subject.asObservable();
  }
}
