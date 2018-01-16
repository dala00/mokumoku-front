import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { DataService } from './data.service';

@Injectable()
export class HttpService {

  constructor(
    private http: Http,
    private data: DataService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  get(url: string, query?: any): any {
    const options = this.getOptions();
    url = this.getUrl(url);
    if (query) {
      url += '?' + this.generatePostBody([], query).join('&');
    }
    return this.http.get(url, options);
  }

  post(url: string, body?: any): any {
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
    const options = this.getOptions({headers});

    if (body && typeof body != 'string') {
      const parts = this.generatePostBody([], body);
      body = parts.join('&');
    }
    if (!body) {
      body = '';
    }
    return this.http.post(this.getUrl(url), body, options);
  }

  generatePostBody(parts: string[], body: any, baseKey?: string): string[] {
    if (Array.isArray(body)) {
      body.forEach((value: any, index: number) => {
        parts = this.generatePostBody(parts, value, `${baseKey}[${index}]`);
      });
    } else if (typeof body == 'object') {
      for (let key in body) {
        const nextKey = baseKey ? `${baseKey}[${key}]` : key;
        parts = this.generatePostBody(parts, body[key], nextKey);
      }
    } else {
      if (typeof body == 'boolean') {
        body = body ? 1 : 0;
      }
      parts.push(baseKey + '=' + encodeURIComponent(body));
    }
    return parts;
  }

  getUrl(url: string) {
    return environment.serverUrl + url;
  }

  private getOptions(params?: any): RequestOptions {
    let rawHeaders = {'Accept': 'application/json'};
    if (params && params['headers'] != undefined) {
      rawHeaders = Object.assign(rawHeaders, params['headers']);
    }
    const headers = new Headers(rawHeaders);
    const options = new RequestOptions({
      withCredentials: true,
      headers
    });
    return options;
  }

  handleError(error: Response | any): any {
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status == 403) {
        this.data.set('user', null);
        this.snackBar.open('ログインを行ってください。', 'OK', {duration: 5000});
        this.router.navigate(['']);
        return;
      }
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
