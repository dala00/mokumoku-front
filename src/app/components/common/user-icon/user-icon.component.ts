import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css']
})
export class UserIconComponent implements OnInit {

  @Input() user: User;
  @Input() width: number;

  constructor() { }

  ngOnInit() {
    if (!this.width) {
      this.width = 48;
    }
  }

}
