import { Directive, ElementRef, Component, Input, forwardRef } from '@angular/core';
import { MdDialogRef, MdDialog } from '@angular/material';
import { Response, ResponseOptions } from '@angular/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FileUploader, FileUploaderOptions, Headers } from 'ng2-file-upload';
import { HttpService } from '../services/http.service';
const SimpleMDE: any = require('simplemde');

@Directive({
  selector: '[appSimplemde]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SimplemdeDirective),
      multi: true
    }
  ]
})
export class SimplemdeDirective implements ControlValueAccessor {

  @Input() uploadUrl: string;
  @Input() parseUploadedUrl: (response: Response) => string;
  propagateChange = (_: any) => {};
  mde: SimpleMDE;
  dialogRef: MdDialogRef<SimplemdeUploadDialog>;
  writtenValue: string;
  firstWriteValue = true;


  constructor(
    private el: ElementRef,
    private dialog: MdDialog,
    private http: HttpService
  ) { }

  writeValue(value: string) {
    if (!this.firstWriteValue || value) {
      this.mde.value(value ? value : '');
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  ngAfterViewInit() {
    let toolbar: any[] = [
      'bold', 'italic', 'strikethrough', 'heading', '|',
      'code', 'quote', 'unordered-list', 'ordered-list', '|',
      'link', 'image',
    ];
    if (this.uploadUrl) {
      toolbar.push({
        name: 'image-upload',
        action: (editor) => {
          this.dialogRef = this.dialog.open(SimplemdeUploadDialog);
          this.dialogRef.componentInstance.callback = (response) => {
            const url = this.http.getUrl(this.parseUploadedUrl(response));
            const cm = editor.codemirror;
            cm.replaceSelection(`![](${url})`);
          };
          this.dialogRef.afterClosed().finally(() => {
            this.dialogRef = null;
          });
          const url = this.http.getUrl(this.uploadUrl);
          this.dialogRef.componentInstance.initialize(url);
        },
        className: 'fa fa-upload',
        title: 'Upload Image',
      });
    }
    toolbar = toolbar.concat([
      'table', '|',
      'preview', 'side-by-side', 'fullscreen', '|',
      'undo', 'redo', '|',
      'guide'
    ]);

    this.mde = new SimpleMDE({
      element: this.el.nativeElement,
      forceSync: true,
      promptURLs: true,
      renderingConfig: {
        codeSyntaxHighlighting: true,
      },
      toolbar: toolbar,
    });
    this.mde.codemirror.on('change', () => {
      this.propagateChange(this.mde.value());
      this.firstWriteValue = false;
    });
  }
}

class MyHeaders implements Headers {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

class MyFileUploaderOptions implements FileUploaderOptions {
  url?: string;
  method?: string;
  headers?: Array<Headers>;
}

@Component({
  selector: 'upload-dialog',
  template: `
  <div md-dialog-content>
    <div
      *ngIf="uploader && uploader.queue.length == 0"
      [class]="dropClass"
      (dragenter)="onDragEnter($event)"
      (dragleave)="onDragLeave($event)"
      (dragover)="onDragOver($event)"
      (drop)="onDrop($event)"
    >
      <button
        md-button
        (click)="onUploadSelect()"
        (drop)="onDrop($event)"
      >
        drop image file or click here !
      </button>
    </div>
    <div *ngIf="uploader && uploader.queue.length > 0">
      uploading...
    </div>
  </div>

  <md-dialog-actions>
    <button md-raised-button (click)="dialogRef.close()">Cancel</button>
  </md-dialog-actions>
  `,
  styles: [`
    md-dialog-actions {
      text-align: center;
    }
    .over {
      background-color: #FFF9C4;
    }
    div[md-dialog-content] div {
      text-align: center;
      padding: 100px 50px;
      border: dashed 1px #aaa;
      border-radius: 8px;
    }
  `],
})
export class SimplemdeUploadDialog {

  uploader: FileUploader;
  callback: (response: Response) => void;
  dropClass = '';
  innerFlag = false;

  constructor(
    public dialogRef: MdDialogRef<SimplemdeUploadDialog>
  ) {
  }

  initialize(url: string) {
    const options = new MyFileUploaderOptions();
    options.url = url;
    options.headers = [
      new MyHeaders('Accept', 'application/json'),
    ];
    this.uploader = new FileUploader(options);
    this.uploader.onCompleteAll = () => this.onCompleteAll();
  }

  onDrop(event: DragEvent) {
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const imageTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
      ];
      if (imageTypes.indexOf(file.type) >= 0) {
        this.uploader.addToQueue([file]);
        this.uploader.uploadAll();
      }
    }
    this.onDragLeave(event);
  }

  onDragEnter(event: Event) {
    this.innerFlag = true;
    event.preventDefault();
  }

  onDragLeave(event: Event) {
    if (this.innerFlag) {
      this.innerFlag = false;
    } else {
      this.dropClass = '';
    }
    event.preventDefault();
  }

  onDragOver(event: Event) {
    this.innerFlag = false;
    this.dropClass = 'over';
    event.preventDefault();
  }

  onUploadSelect() {

  }

  onCompleteAll() {
    const options = new ResponseOptions({body: this.uploader.queue[0]._xhr.response});
    const response = new Response(options);
    this.callback(response);
    this.dialogRef.close();
  }
}
