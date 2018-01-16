/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { MainComponent } from './main.component';
import { MeetingsComponent } from '../../common/meetings/meetings.component';
import { SearchComponent } from '../../common/search/search.component';
import { StarComponent } from '../../common/star/star.component';
import { TagsComponent } from '../../common/tags/tags.component';
import { UserIconComponent } from '../../common/user-icon/user-icon.component';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { StriptagsPipe } from '../../../pipes/striptags.pipe';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';
import { MeetingService } from '../../../services/meeting.service';
import { HttpService } from '../../../services/http.service';
import { RouterLinkStubDirective } from '../../../../testing/router-stubs';
import { MeetingServiceStub } from '../../../../testing/meeting-service-stub';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let meetingService = new MeetingServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        MeetingsComponent,
        SearchComponent,
        StarComponent,
        TagsComponent,
        UserIconComponent,
        TruncatePipe,
        StriptagsPipe,
        MarkdownPipe,
        RouterLinkStubDirective,
      ],
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
      ],
      providers: [
        {provide: MeetingService, useValue: meetingService},
        {provide: Router, useValue: {navigate: () => {}}},
      ]
    })
    .compileComponents();

    const meeting = {
      id: 1,
      name: 'name',
      body: 'body',
      user: {
        name: 'username',
      },
    };
    meetingService.response = {json: () => meeting}
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
