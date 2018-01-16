/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/common/signin/signin.component';
import { UserMenuComponent } from './components/common/user-menu/user-menu.component';
import { DataService } from './services/data.service';
import { SeoService } from './services/seo.service';
import { HttpService } from './services/http.service';
import { HttpServiceStub } from '../testing/http-service-stub';

describe('AppComponent', () => {
  let http = new HttpServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule.forRoot(),
        FormsModule,
      ],
      declarations: [
        AppComponent,
        SigninComponent,
        UserMenuComponent,
      ],
      providers: [
        {provide: HttpService, useValue: http},
        DataService,
        SeoService,
      ]
    });
    TestBed.compileComponents();

    http.data = {};
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('一人もくもく会');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.mdl-layout-title').textContent).toContain('一人もくもく会');
  }));
});
