import { Injectable, Component } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Observable } from 'rxjs';

@Injectable()
export class ConfirmService {

  dialogRef: MdDialogRef<ConfirmDialog>;

  constructor(
    public dialog: MdDialog
  ) { }

  open(message, items?: ConfirmItem[]): Observable<any> {
    this.dialogRef = this.dialog.open(ConfirmDialog, {
      disableClose: false,
    });
    if (!items) {
      items = [
        new ConfirmItem('OK', 'OK', 'primary'),
        new ConfirmItem('Cancel'),
      ];
    }
    this.dialogRef.componentInstance.message = message;
    this.dialogRef.componentInstance.items = items;

    return this.dialogRef.afterClosed().finally(() => {
      this.dialogRef = null;
    });
  }
}

export class ConfirmItem {
  value: string;
  name: string;
  color: string;

  constructor(value: string, name?: string, color?: string) {
    if (!name) {
      name = value;
    }
    this.name = name;
    this.value = value;
    if (color) {
      this.color = color;
    }
  }
}

@Component({
  selector: 'confirm-dialog',
  template: `
  <p md-dialog-content>{{message}}</p>

  <md-dialog-actions>
    <button md-raised-button
      *ngFor="let item of items"
      (click)="dialogRef.close(item.value)"
      color="{{item.color ? item.color : ''}}"
    >
      {{item.name}}
    </button>
  </md-dialog-actions>
  `,
  styles: [`
    button {
      margin-right: 8px;
    }
  `],
})
export class ConfirmDialog {

  message: string;
  items: ConfirmItem[];

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) { }
}
