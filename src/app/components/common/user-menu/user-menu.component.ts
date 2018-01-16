import { Component, OnInit, Input } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  @Input() user: User;

  constructor(
    private router: Router,
    private data: DataService,
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  onProfileClick() {

  }

  onSignOutClick() {
    this.http.post('api/users/logout')
      .subscribe((res: Response) => {
        this.data.del('user');
        location.href = '';
      });
  }
}
