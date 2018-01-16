/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { Router } from '@angular/router';

import { UserMenuComponent } from './user-menu.component';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { User } from '../../../models/user';
import { HttpServiceStub } from '../../../../testing/http-service-stub';
import { RouterLinkStubDirective } from '../../../../testing/router-stubs';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;
  let http = new HttpServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserMenuComponent,
        RouterLinkStubDirective,
      ],
      imports: [
        MaterialModule.forRoot(),
      ],
      providers: [
        {provide: Router, useValue: {navigate: () => {}}},
        DataService,
        {provide: HttpService, useValue: http},
      ],
    })
    .compileComponents();

    http.data = {};
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    component.user = new User({
      id: 1,
      name: 'name',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
