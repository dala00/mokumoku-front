/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { MeetingsComponent } from './meetings.component';
import { TagsComponent } from '../../common/tags/tags.component';
import { StarComponent } from '../../common/star/star.component';
import { SearchComponent } from '../../common/search/search.component';
import { UserIconComponent } from '../../common/user-icon/user-icon.component';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';
import { StriptagsPipe } from '../../../pipes/striptags.pipe';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { MeetingService } from '../../../services/meeting.service';

describe('MeetingsComponent', () => {
  let component: MeetingsComponent;
  let fixture: ComponentFixture<MeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [
        MeetingsComponent,
        TagsComponent,
        StarComponent,
        SearchComponent,
        UserIconComponent,
        TruncatePipe,
        MarkdownPipe,
        StriptagsPipe,
      ],
      providers: [
        HttpService,
        MeetingService,
        DataService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
