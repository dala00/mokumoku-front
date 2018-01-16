import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HttpServiceStub {

  private subject = new BehaviorSubject(this.data);
  private _data: {};

  get data() { return this._data }
  set data(data: {}) {
    this._data = data;
    this.subject.next(this._data);
  }

  get() {
    return this.subject.asObservable();
  }

  post(url: string, body?: any) {
    return this.subject.asObservable();
  }
}
