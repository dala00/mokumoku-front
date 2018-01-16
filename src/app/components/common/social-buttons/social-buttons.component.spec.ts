/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SocialButtonsComponent } from './social-buttons.component';
import { FacebookShareButtonComponent } from '../../common/facebook-share-button/facebook-share-button.component';
import { GooglePlusButtonComponent } from '../../common/google-plus-button/google-plus-button.component';
import { HatenaBookmarkButtonComponent } from '../../common/hatena-bookmark-button/hatena-bookmark-button.component';
import { TwitterShareButtonComponent } from '../../common/twitter-share-button/twitter-share-button.component';

describe('SocialButtonsComponent', () => {
  let component: SocialButtonsComponent;
  let fixture: ComponentFixture<SocialButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SocialButtonsComponent,
        FacebookShareButtonComponent,
        GooglePlusButtonComponent,
        HatenaBookmarkButtonComponent,
        TwitterShareButtonComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
