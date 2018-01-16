/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';

import { ActivatedRouteStub } from '../../../../testing/router-stubs';
import { UserServiceStub } from '../../../../testing/user-service-stub';
import { ParagraphPipe } from '../../../pipes/paragraph.pipe';
import { StriptagsPipe } from '../../../pipes/striptags.pipe';
import { MarkdownPipe } from '../../../pipes/markdown.pipe';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { UserDetailComponent } from './user-detail.component';
import { UserService } from '../../../services/user.service';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';
import { UserIconComponent } from '../../common/user-icon/user-icon.component';
import { MeetingsComponent } from '../../common/meetings/meetings.component';
import { StarComponent } from '../../common/star/star.component';
import { TagsComponent } from '../../common/tags/tags.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let activatedRoute = new ActivatedRouteStub();
  let userService = new UserServiceStub();
  let user = new User({
    id: 1,
    icon_select: 'github',
    github_icon: 'github.png',
    twitter_icon: 'twitter.png',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        RouterModule,
        RouterTestingModule,
      ],
      declarations: [
        UserDetailComponent,
        ParagraphPipe,
        StriptagsPipe,
        MarkdownPipe,
        TruncatePipe,
        UserIconComponent,
        MeetingsComponent,
        StarComponent,
        TagsComponent,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: UserService, useValue: userService},
        DataService,
      ],
    })
    .compileComponents();

    activatedRoute.testParams = {id: 1};
    userService.user = user;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('user set', () => {
    expect(component.user && component.user == user).toBeTruthy();
  });
});
