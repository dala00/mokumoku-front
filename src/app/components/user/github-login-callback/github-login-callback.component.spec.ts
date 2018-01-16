/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response, ResponseOptions } from '@angular/http';

import { GithubLoginCallbackComponent } from './github-login-callback.component';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { User } from '../../../models/user';
import { ActivatedRouteStub } from '../../../../testing/router-stubs';
import { HttpServiceStub } from '../../../../testing/http-service-stub';

describe('GithubLoginCallbackComponent', () => {
  let component: GithubLoginCallbackComponent;
  let fixture: ComponentFixture<GithubLoginCallbackComponent>;
  let activatedRoute = new ActivatedRouteStub();
  let httpService = new HttpServiceStub();
  const router = {
    navigate: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubLoginCallbackComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: HttpService, useValue: httpService},
        DataService,
        {provide: Router, useValue: router},
      ],
    })
    .compileComponents();

    activatedRoute.testParams = {code: 'code'};
    httpService.data = {
      json: () => new User()
    }
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
