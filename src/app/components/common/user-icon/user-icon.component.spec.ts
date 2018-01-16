/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserIconComponent } from './user-icon.component';
import { User } from '../../../models/user';
import { RouterLinkStubDirective } from '../../../../testing/router-stubs';

describe('UserIconComponent', () => {
  let component: UserIconComponent;
  let fixture: ComponentFixture<UserIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserIconComponent,
        RouterLinkStubDirective,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIconComponent);
    component = fixture.componentInstance;
    component.user = new User({
      id: 1,
      icon_select: 'github',
      github_icon: 'github.png',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
