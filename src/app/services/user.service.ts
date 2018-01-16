import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpService } from './http.service';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(
    private httpService: HttpService
  ) { }

  get(id: number): Observable<User> {
    return this.httpService.get('api/users/view/' + id)
      .map((res: Response) => new User(res.json().user))
      .catch(this.httpService.handleError);
  }

  getEdit(): Observable<User> {
    return this.httpService.get('api/users/edit')
      .map((res: Response) => new User(res.json().user))
      .catch(this.httpService.handleError);
  }

  edit(user: User): Observable<User> {
    return this.httpService.post('api/users/post-edit', user)
      .map((res: Response) => new User(res.json().user))
      .catch(this.httpService.handleError);
  }

  deleteSocial(social: string): Observable<User> {
    return this.httpService.post('api/users/delete-social', {social})
      .map((res: Response) => new User(res.json().user));
  }
}
