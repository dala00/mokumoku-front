import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  dialogRef: MdDialogRef<SignInDialog>;

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  onSignInClick(event) {
    this.dialogRef = this.dialog.open(SignInDialog, {
      disableClose: false,
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
    });
    event.stopPropagation();
  }
}

@Component({
  selector: 'signin-dialog',
  templateUrl: './signin-dialog.html',
  styleUrls: ['./signin-dialog.css']
})
export class SignInDialog {

  constructor(
    public dialogRef: MdDialogRef<SignInDialog>,
    private data: DataService
  ) { }
}
