/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MeetingPostEditComponent } from './meeting-post-edit.component';
import { MeetingService } from '../../../services/meeting.service';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { ActivatedRouteStub } from '../../../../testing/router-stubs';
import { MeetingServiceStub } from '../../../../testing/meeting-service-stub';

describe('MeetingPostEditComponent', () => {
  let component: MeetingPostEditComponent;
  let fixture: ComponentFixture<MeetingPostEditComponent>;
  let activatedRoute = new ActivatedRouteStub;
  let meetingService = new MeetingServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
        RouterTestingModule,
      ],
      declarations: [
        MeetingPostEditComponent
      ],
      providers: [
        HttpService,
        DataService,
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: MeetingService, useValue: meetingService},
      ]
    })
    .compileComponents();

    activatedRoute.testParams = {id: 1};
    meetingService.meeting = {
      id: 1,
      body: 'body',
      meeting: {
        name: 'userName',
      }
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingPostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
