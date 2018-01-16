import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-github-login-callback',
  templateUrl: './github-login-callback.component.html',
  styleUrls: ['./github-login-callback.component.css']
})
export class GithubLoginCallbackComponent implements OnInit {

  constructor(
    private http: HttpService,
    private data: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.http.post('api/users/github-login-callback', params)
        .subscribe((res: Response) => {
          this.data.set('user', res.json().user as User);
          this.router.navigate(['']);
        });
    });
  }

}
