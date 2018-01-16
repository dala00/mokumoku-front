/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Md2Module }  from 'md2';
import { TagInputModule } from 'ng2-tag-input';

import { MeetingEditComponent } from './meeting-edit.component';
import { MeetingFormComponent } from '../../common/meeting-form/meeting-form.component';
import { MeetingService } from '../../../services/meeting.service';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { Meeting } from '../../../models/meeting';
import { ActivatedRouteStub } from '../../../../testing/router-stubs';
import { MeetingServiceStub } from '../../../../testing/meeting-service-stub';

describe('MeetingEditComponent', () => {
  let component: MeetingEditComponent;
  let fixture: ComponentFixture<MeetingEditComponent>;
  let activatedRoute = new ActivatedRouteStub();
  let meetingService = new MeetingServiceStub();
  let meeting = new Meeting();
  meeting.id = 1;
  meeting.name = 'name';
  meeting.body = 'body';
  meeting.objective = 'objective';
  meeting.start_time = new Date();
  meeting.end_time = new Date();
  meeting.tags = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MeetingEditComponent,
        MeetingFormComponent,
      ],
      imports: [
        FormsModule,
        MaterialModule.forRoot(),
        Md2Module.forRoot(),
        TagInputModule,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: MeetingService, useValue: meetingService},
        {provide: Router, useValue: {navigate: () => {}}},
        HttpService,
        DataService,
      ],
    })
    .compileComponents();

    activatedRoute.testParams = {id: 1};
    meetingService.meeting = meeting;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
