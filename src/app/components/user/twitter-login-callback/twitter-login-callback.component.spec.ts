/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TwitterLoginCallbackComponent } from './twitter-login-callback.component';
import { HttpService } from '../../../services/http.service';
import { HttpServiceStub } from '../../../../testing/http-service-stub';
import { DataService } from '../../../services/data.service';
import { ActivatedRouteStub } from '../../../../testing/router-stubs';
import { User } from '../../../models/user';

describe('TwitterLoginCallbackComponent', () => {
  let component: TwitterLoginCallbackComponent;
  let fixture: ComponentFixture<TwitterLoginCallbackComponent>;
  let activatedRoute = new ActivatedRouteStub;
  let http = new HttpServiceStub;
  const user = new User({id:1});


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterLoginCallbackComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: HttpService, useValue: http},
        DataService,
        {provide: Router, useValue: {
          navigate: () => true,
        }},
      ]
    })
    .compileComponents();

    activatedRoute.testParams = {};
    http.data = {
      json: () => {
        return {'user': user};
      },
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
