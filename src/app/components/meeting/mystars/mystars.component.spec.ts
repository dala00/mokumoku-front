/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MystarsComponent } from './mystars.component';
import { MeetingsComponent } from '../../common/meetings/meetings.component';
import { TagsComponent } from '../../common/tags/tags.component';
import { StarComponent } from '../../common/star/star.component';
import { UserIconComponent } from '../../common/user-icon/user-icon.component';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';
import { StriptagsPipe } from '../../../pipes/striptags.pipe';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';

describe('MystarsComponent', () => {
  let component: MystarsComponent;
  let fixture: ComponentFixture<MystarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        RouterModule,
        RouterTestingModule,
      ],
      declarations: [
        MystarsComponent,
        MeetingsComponent,
        TagsComponent,
        StarComponent,
        UserIconComponent,
        TruncatePipe,
        MarkdownPipe,
        StriptagsPipe,
      ],
      providers: [
        HttpService,
        DataService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MystarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
