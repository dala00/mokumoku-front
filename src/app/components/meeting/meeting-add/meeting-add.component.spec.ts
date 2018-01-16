/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TagInputModule } from 'ng2-tag-input';
import { Md2Module }  from 'md2';

import { MeetingAddComponent } from './meeting-add.component';
import { MeetingFormComponent } from '../../common/meeting-form/meeting-form.component';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { MeetingService } from '../../../services/meeting.service';
import { MeetingServiceStub } from '../../../../testing/meeting-service-stub';

describe('MeetingAddComponent', () => {
  let component: MeetingAddComponent;
  let fixture: ComponentFixture<MeetingAddComponent>;
  let meetingService = new MeetingServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MeetingAddComponent,
        MeetingFormComponent,
      ],
      imports: [
        FormsModule,
        MaterialModule.forRoot(),
        TagInputModule,
        Md2Module.forRoot(),
      ],
      providers: [
        {provide: MeetingService, useValue: meetingService},
        {provide: Router, useValue: {navigate: () => {}}},
        HttpService,
        DataService,
      ],
    })
    .compileComponents();

    meetingService.meeting = {
      id: 1,
      name: 'name',
      objective: 'objective',
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
