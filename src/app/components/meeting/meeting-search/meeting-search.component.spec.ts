/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { MeetingSearchComponent } from './meeting-search.component';
import { MeetingsComponent } from '../../common/meetings/meetings.component';
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

describe('MeetingSearchComponent', () => {
  let component: MeetingSearchComponent;
  let fixture: ComponentFixture<MeetingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        RouterTestingModule,
        FormsModule,
      ],
      declarations: [
        MeetingSearchComponent,
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
    fixture = TestBed.createComponent(MeetingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
