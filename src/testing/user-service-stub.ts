import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserServiceStub {

  private subject = new BehaviorSubject(this.user);
  private _user: {};

  get user() { return this._user }
  set user(user: {}) {
    this._user = user;
    this.subject.next(this._user);
  }

  get(id: number) {
    return this.subject.asObservable();
  }
}
