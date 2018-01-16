import 'rxjs/Rx';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';
import { Md2Module }  from 'md2';
import { TagInputModule } from 'ng2-tag-input';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main/main.component';

import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';
import { MeetingService } from './services/meeting.service';
import { UserService } from './services/user.service';
import { ConfirmService, ConfirmDialog } from './services/confirm.service';
import { SeoService } from './services/seo.service';
import { HighlightService } from './services/highlight.service';

import { MeetingsComponent } from './components/common/meetings/meetings.component';
import { MeetingDetailComponent } from './components/meeting/meeting-detail/meeting-detail.component';
import { MarkdownPipe } from './pipes/markdown.pipe';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { SigninComponent } from './components/common/signin/signin.component';
import { SignInDialog } from './components/common/signin/signin.component';
import { GithubLoginCallbackComponent } from './components/user/github-login-callback/github-login-callback.component';
import { UserMenuComponent } from './components/common/user-menu/user-menu.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { StriptagsPipe } from './pipes/striptags.pipe';
import { MeetingAddComponent } from './components/meeting/meeting-add/meeting-add.component';
import { MeetingFormComponent } from './components/common/meeting-form/meeting-form.component';
import { TagsComponent } from './components/common/tags/tags.component';
import { MomentPipe } from './pipes/moment.pipe';
import { HatenaBookmarkButtonComponent } from './components/common/hatena-bookmark-button/hatena-bookmark-button.component';
import { SocialButtonsComponent } from './components/common/social-buttons/social-buttons.component';
import { TwitterShareButtonComponent } from './components/common/twitter-share-button/twitter-share-button.component';
import { GooglePlusButtonComponent } from './components/common/google-plus-button/google-plus-button.component';
import { FacebookShareButtonComponent } from './components/common/facebook-share-button/facebook-share-button.component';
import { SimplemdeDirective, SimplemdeUploadDialog } from './directives/simplemde.directive';
import { MeetingEditComponent } from './components/meeting/meeting-edit/meeting-edit.component';
import { TwitterLoginCallbackComponent } from './components/user/twitter-login-callback/twitter-login-callback.component';
import { UserIconComponent } from './components/common/user-icon/user-icon.component';
import { MeetingPostEditComponent } from './components/meeting/meeting-post-edit/meeting-post-edit.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { ParagraphPipe } from './pipes/paragraph.pipe';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { PageComponent } from './components/page/page.component';
import { StarComponent } from './components/common/star/star.component';
import { MeetingSearchComponent } from './components/meeting/meeting-search/meeting-search.component';
import { SearchComponent } from './components/common/search/search.component';
import { ContactComponent } from './components/main/contact/contact.component';
import { MystarsComponent } from './components/meeting/mystars/mystars.component';
import { NofollowPipe } from './pipes/nofollow.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MeetingsComponent,
    MeetingDetailComponent,
    MarkdownPipe,
    UserDetailComponent,
    SigninComponent,
    SignInDialog,
    ConfirmDialog,
    SimplemdeUploadDialog,
    GithubLoginCallbackComponent,
    UserMenuComponent,
    TruncatePipe,
    StriptagsPipe,
    MeetingAddComponent,
    MeetingFormComponent,
    TagsComponent,
    MomentPipe,
    HatenaBookmarkButtonComponent,
    SocialButtonsComponent,
    TwitterShareButtonComponent,
    GooglePlusButtonComponent,
    FacebookShareButtonComponent,
    SimplemdeDirective,
    MeetingEditComponent,
    TwitterLoginCallbackComponent,
    UserIconComponent,
    MeetingPostEditComponent,
    SanitizeHtmlPipe,
    ParagraphPipe,
    UserEditComponent,
    PageComponent,
    StarComponent,
    MeetingSearchComponent,
    SearchComponent,
    ContactComponent,
    MystarsComponent,
    NofollowPipe,
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    Md2Module.forRoot(),
    TagInputModule,
    InfiniteScrollModule,
  ],
  providers: [
    HttpService,
    DataService,
    MeetingService,
    UserService,
    ConfirmService,
    SeoService,
    HighlightService,
  ],
  entryComponents: [
    SignInDialog,
    ConfirmDialog,
    SimplemdeUploadDialog,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
