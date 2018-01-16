import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { ConfirmService } from '../../../services/confirm.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [
    MdSnackBar,
  ]
})
export class UserEditComponent implements OnInit {

  user: User;
  socials: string[];

  constructor(
    private userService: UserService,
    private confirmService: ConfirmService,
    private http: HttpService,
    private data: DataService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getEdit()
      .subscribe(user => this.user = user);
  }

  onSubmit() {
    this.userService.edit(this.user)
      .subscribe((user) => {
        this.data.set('user', user);
        this.snackBar.open('更新しました。', 'OK', {duration: 5000});
        this.router.navigate(['/user', user.id]);
      })
  }

  onAddGithub() {
    location.href = this.data.get('githubLoginUrl');
  }

  onDeleteGithub() {
    this.deleteSocialProc('github');
  }

  onAddTwitter() {
    location.href = this.data.get('twitterLoginUrl');
  }

  onDeleteTwitter() {
    this.deleteSocialProc('twitter');
  }

  private deleteSocialProc(social: string) {
    this.userService.deleteSocial(social)
      .subscribe(
        (user: User) => this.user = user,
        (error: Response) => {
          if (error.json().message == 'is_not_enable') {
            this.snackBar.open('最低一つ以上の連携が必要です。解除する場合は退会を行ってください。', 'OK', {duration: 10000});
          }
        }
      );
  }

  onWithdraw() {
    this.confirmService.open('退会してよろしいですか？')
      .subscribe((result: string) => {
        if (result == 'OK') {
          this.http.post('api/users/withdraw')
            .catch(res => this.http.handleError(res))
            .subscribe((res) => {
              this.data.set('user', null);
              this.router.navigate(['']);
            });
        }
      });
  }
}
