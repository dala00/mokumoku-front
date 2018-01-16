import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { HttpService } from '../../../services/http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MdSnackBar],
})
export class ContactComponent implements OnInit {

  contact: Object;

  constructor(
    private http: HttpService,
    private snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.contact = {};
  }

  onSubmit() {
    this.http.post('api/menu/contact', this.contact)
      .catch(res => this.http.handleError(res))
      .subscribe((res: Response) => {
        this.snackBar.open('送信しました。', 'OK', {duration:3000});
        this.router.navigate(['']);
      });
  }
}
