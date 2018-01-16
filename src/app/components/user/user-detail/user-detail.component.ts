import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User;
  loginUser: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.sync('user', user => this.loginUser = user);
    this.route.params
      .switchMap((params: Params) => this.userService.get(params['id']))
      .subscribe((user: User) => this.user = user as User);
  }

}
