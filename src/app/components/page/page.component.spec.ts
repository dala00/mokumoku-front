/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageComponent } from './page.component';
import { HttpService } from '../../services/http.service';
import { HttpServiceStub } from '../../../testing/http-service-stub';
import { ActivatedRouteStub } from '../../../testing/router-stubs';
import { Page } from '../../models/page';
import { MarkdownPipe } from '../../pipes/markdown.pipe';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let http = new HttpServiceStub;
  let page = new Page;
  page.name = 'name';
  page.body = 'body';
  let activatedRoute = new ActivatedRouteStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageComponent,
        MarkdownPipe,
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: HttpService, useValue: http},
      ],
    })
    .compileComponents();

    activatedRoute.testParams = {id:'id'};

    http.data = {
      json: () => {
        return {page};
      }
    };
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
