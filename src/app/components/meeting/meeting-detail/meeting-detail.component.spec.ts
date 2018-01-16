/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdSnackBar } from '@angular/material';
import * as moment from 'moment';

import { MeetingDetailComponent } from './meeting-detail.component';
import { UserIconComponent } from '../../common/user-icon/user-icon.component';
import { StarComponent } from '../../common/star/star.component';
import { TagsComponent } from '../../common/tags/tags.component';
import { SocialButtonsComponent } from '../../common/social-buttons/social-buttons.component';
import { FacebookShareButtonComponent } from '../../common/facebook-share-button/facebook-share-button.component';
import { GooglePlusButtonComponent } from '../../common/google-plus-button/google-plus-button.component';
import { HatenaBookmarkButtonComponent } from '../../common/hatena-bookmark-button/hatena-bookmark-button.component';
import { TwitterShareButtonComponent } from '../../common/twitter-share-button/twitter-share-button.component';
import { MomentPipe } from '../../../pipes/moment.pipe';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';
import { ParagraphPipe } from '../../../pipes/paragraph.pipe';
import { NofollowPipe } from '../../../pipes/nofollow.pipe';
import { MeetingService } from '../../../services/meeting.service';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { ConfirmService } from '../../../services/confirm.service';
import { SeoService } from '../../../services/seo.service';
import { Meeting } from '../../../models/meeting';
import { User } from '../../../models/user';
import { HighlightService } from '../../../services/highlight.service';
import { ActivatedRouteStub, RouterLinkStubDirective } from '../../../../testing/router-stubs';
import { MeetingServiceStub } from '../../../../testing/meeting-service-stub';

describe('MeetingDetailComponent', () => {
  let component: MeetingDetailComponent;
  let fixture: ComponentFixture<MeetingDetailComponent>;
  let activatedRoute = new ActivatedRouteStub;
  let meetingService = new MeetingServiceStub;
  const user = new User({
    id: 1,
    name: 'username',
    icon_select: 'github',
    github_icon: 'test',
  });
  const meeting = new Meeting({
    id: 1,
    user_id: 1,
    user: user,
    name: 'name',
    body: 'body',
    objective: 'objective',
    start_time: moment(),
    end_time: moment(),
    closed: true,
    tags: [],
    meeting_posts: [],
    meeting_comments: [],
    user_star: null,
    star_count: 0,
    private: false,
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MeetingDetailComponent,
        UserIconComponent,
        StarComponent,
        TagsComponent,
        SocialButtonsComponent,
        FacebookShareButtonComponent,
        GooglePlusButtonComponent,
        HatenaBookmarkButtonComponent,
        TwitterShareButtonComponent,
        MomentPipe,
        MarkdownPipe,
        ParagraphPipe,
        NofollowPipe,
        RouterLinkStubDirective,
      ],
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: MeetingService, useValue: meetingService},
        HttpService,
        DataService,
        ConfirmService,
        SeoService,
        {provide: HighlightService, useValue: {initialize: () => {}}},
        MdSnackBar,
      ]
    })
    .compileComponents();

    activatedRoute.testParams = {id: 1};
    meetingService.meeting = meeting;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
