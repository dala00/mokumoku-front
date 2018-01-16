/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TagInputModule } from 'ng2-tag-input';
import { Md2Module }  from 'md2';
import * as moment from 'moment';

import { MeetingFormComponent } from './meeting-form.component';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { MeetingService } from '../../../services/meeting.service';
import { MeetingServiceStub } from '../../../../testing/meeting-service-stub';
import { Meeting } from '../../../models/meeting';

describe('MeetingFormComponent', () => {
  let component: MeetingFormComponent;
  let fixture: ComponentFixture<MeetingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MeetingFormComponent,
      ],
      imports: [
        FormsModule,
        MaterialModule.forRoot(),
        TagInputModule,
        Md2Module.forRoot(),
      ],
      providers: [
        {provide: Router, useValue: {navigate: () => {}}},
        HttpService,
        DataService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingFormComponent);
    component = fixture.componentInstance;
    component.meeting = new Meeting({
      id: 1,
      name: 'name',
      objective: 'objective',
      start_time: moment(),
      end_time: moment(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
