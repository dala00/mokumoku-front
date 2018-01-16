/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { UserEditComponent } from './user-edit.component';
import { UserService } from '../../../services/user.service';
import { HttpService } from '../../../services/http.service';
import { DataService } from '../../../services/data.service';
import { ConfirmService } from '../../../services/confirm.service';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('UserEditComponent', () => {
  let component: UserEditComponent;
  let fixture: ComponentFixture<UserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule.forRoot(),
        FormsModule,
      ],
      declarations: [
        UserEditComponent,
      ],
      providers: [
        UserService,
        HttpService,
        DataService,
        ConfirmService,
        {provide:Router, useClass:MockRouter},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
