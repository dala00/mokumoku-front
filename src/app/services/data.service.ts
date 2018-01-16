import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class DataService {

  data: any[];
  private updateSources: any;
  private syncs: any;

  constructor() {
    this.data = [];
    this.updateSources = {};
    this.syncs = {};
  }

  set(key: any, value?: any) {
    if (value !== undefined) {
      const originalKey = key;
      key = {};
      key[originalKey] = value;
    }

    this.data = Object.assign(this.data, key);
    for (let currentKey in key) {
      if (this.updateSources[currentKey] != undefined) {
        this.updateSources[currentKey].next(key[currentKey]);
      }
    }
  }

  get(key: string | number) {
    if (this.data[key] == undefined) {
      return null;
    }
    return this.data[key];
  }

  sync(key: string | number, callback: (data: any)=>void) {
    if (this.syncs[key] == undefined) {
      const updateSource = new Subject<any>();
      this.updateSources[key] = updateSource;
      this.syncs[key] = updateSource.asObservable();
    }
    this.syncs[key].subscribe(result => callback(result));
    if (this.data[key] != undefined) {
      callback(this.data[key]);
    }
  }

  del(key: string | number) {
    delete this.data[key];
  }
}
