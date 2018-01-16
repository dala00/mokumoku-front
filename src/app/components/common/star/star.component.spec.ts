/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StarComponent } from './star.component';
import { DataService } from '../../../services/data.service';
import { HttpService } from '../../../services/http.service';
import { HttpServiceStub } from '../../../../testing/http-service-stub';

describe('StarComponent', () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;
  let http = new HttpServiceStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StarComponent,
      ],
      providers: [
        {provide: HttpService, useValue: http},
        DataService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
